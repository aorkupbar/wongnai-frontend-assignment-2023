import React from 'react'

const MainLayout: React.FC = ({ children }) => {
	return (
		<div className="main-layout flex justify-center px-4">
			<div className="container md:mx-auto">
				{children}
			</div>
		</div>
	)
}

export default MainLayout;
