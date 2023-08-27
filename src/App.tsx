import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<>Login</>} />
				<Route path="/login" element={<>Login</>} />
				<Route path="/dashboard/*" element={<>Dashboard</>}>
					<Route index element={<>Users</>} />
					<Route index path="users" element={<>Users page</>} />
					<Route path="users/:id/profile" element={<>user details</>} />
				</Route>
				<Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
			</Routes>
		</div>
	);
}

export default App;
