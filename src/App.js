import React, { useCallback, lazy, Suspense, useReducer } from "react";
import styles from "./App.module.css";

const Header = lazy(() => import("./components/Header/Header"));
const UserDropdown = lazy(() =>
  import("./components/UserDropdown/UserDropdown")
);
const InputField = lazy(() => import("./components/InputField/InputField"));
const ResultDisplay = lazy(() =>
  import("./components/ResultDisplay/ResultDisplay")
);
const UserAnalyses = lazy(() =>
  import("./components/UserAnalyses/UserAnalyses")
);

const initialState = {
  userInput: "",
  analysisResult: "",
  currentUser: "Admin",
  analyses: {
    Admin: [],
    User1: [],
    User2: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER_INPUT":
      return {
        ...state,
        userInput: action.payload,
      };
    case "SET_ANALYSIS_RESULT":
      return {
        ...state,
        analysisResult: action.payload,
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
        userInput: "",
      };
    case "ADD_ANALYSIS":
      const updatedAnalyses = {
        ...state.analyses,
        [state.currentUser]: [
          ...state.analyses[state.currentUser],
          { text: state.userInput, result: state.analysisResult },
        ],
      };
      return {
        ...state,
        analyses: updatedAnalyses,
      };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = useCallback(async (e) => {
    const text = e.target.value;
    dispatch({ type: "SET_USER_INPUT", payload: text });

    if (text) {
      try {
        const response = await fetch("http://localhost:3002/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        dispatch({ type: "SET_ANALYSIS_RESULT", payload: data.result });
      } catch (error) {
        console.error("Error analyzing text:", error);
        dispatch({
          type: "SET_ANALYSIS_RESULT",
          payload: "Error occurred while analyzing text.",
        });
      }
    } else {
      dispatch({ type: "RESET_ANALYSIS_RESULT" });
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!state.userInput || !state.analysisResult) return;

    try {
      const response = await fetch("http://localhost:3002/api/save-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: state.currentUser,
          text: state.userInput,
          result: state.analysisResult,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.success) {
        dispatch({ type: "ADD_ANALYSIS" });
        dispatch({ type: "SET_USER_INPUT", payload: "" });
      }
    } catch (error) {
      console.error("Error saving analysis data:", error);
    }
  }, [state.userInput, state.analysisResult, state.currentUser]);

  const handleUserChange = (e) => {
    dispatch({ type: "SET_CURRENT_USER", payload: e.target.value });
  };

  console.log(state);

  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <UserDropdown
          currentUser={state.currentUser}
          handleUserChange={handleUserChange}
        />
        <div className={styles.mainContent}>
          <Header />
          <InputField
            userInput={state.userInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <ResultDisplay analysisResult={state.analysisResult} />
        </div>
        <UserAnalyses
          currentUser={state.currentUser}
          analyses={state.analyses[state.currentUser]}
        />
      </Suspense>
    </div>
  );
};

export default App;
