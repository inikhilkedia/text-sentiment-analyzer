import React, { memo, ChangeEvent } from 'react';
import styles from './UserDropdown.module.css';
import { ChevronDown } from 'react-feather';

interface Props {
	currentUser: string;
	handleUserChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const UserDropdown: React.FC<Props> = ({ currentUser, handleUserChange }) => (
	<div className={styles.userDropdown}>
		<select
			value={currentUser}
			onChange={handleUserChange}
			className={styles.select}
		>
			<option value='Admin'>Admin</option>
			<option value='User1'>User1</option>
			<option value='User2'>User2</option>
		</select>
		<ChevronDown size={16} className={styles.chevron} />
	</div>
);

export default memo(UserDropdown);
