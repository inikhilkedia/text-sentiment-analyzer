import { renderHook, act } from '@testing-library/react';
import { useTextAnalyzer } from './useTextAnalyzer';
import { AnalysisResult } from '../types';

describe('useTextAnalyzer', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useTextAnalyzer());

    expect(result.current.state).toEqual({
      userInput: '',
      analysisResult: null,
      currentUser: 'Admin',
      analyses: {
        Admin: [],
        User1: [],
        User2: [],
      },
    });
  });

  it('should update user input', () => {
    const { result } = renderHook(() => useTextAnalyzer());

    act(() => {
      result.current.setUserInput('test input');
    });

    expect(result.current.state.userInput).toBe('test input');
  });

  it('should update current user', () => {
    const { result } = renderHook(() => useTextAnalyzer());

    act(() => {
      result.current.setCurrentUser('User1');
    });

    expect(result.current.state.currentUser).toBe('User1');
    expect(result.current.state.userInput).toBe(''); // Should clear input
  });

  it('should update analysis result', () => {
    const { result } = renderHook(() => useTextAnalyzer());
    const mockResult: AnalysisResult = {
      sentiment: 'positive',
      score: 0.8,
      magnitude: 0.5,
    };

    act(() => {
      result.current.setAnalysisResult(mockResult);
    });

    expect(result.current.state.analysisResult).toEqual(mockResult);
  });

  it('should add analysis to current user', () => {
    const { result } = renderHook(() => useTextAnalyzer());
    const mockResult: AnalysisResult = {
      sentiment: 'positive',
      score: 0.8,
      magnitude: 0.5,
    };

    act(() => {
      result.current.setUserInput('test text');
      result.current.setAnalysisResult(mockResult);
      result.current.addAnalysis();
    });

    expect(result.current.state.analyses.Admin).toHaveLength(1);
    expect(result.current.state.analyses.Admin[0]).toMatchObject({
      text: 'test text',
      result: mockResult,
    });
    expect(result.current.state.analyses.Admin[0].timestamp).toBeDefined();
  });

  it('should reset analysis result', () => {
    const { result } = renderHook(() => useTextAnalyzer());
    const mockResult: AnalysisResult = {
      sentiment: 'positive',
      score: 0.8,
      magnitude: 0.5,
    };

    act(() => {
      result.current.setAnalysisResult(mockResult);
      result.current.resetAnalysisResult();
    });

    expect(result.current.state.analysisResult).toBeNull();
  });
}); 