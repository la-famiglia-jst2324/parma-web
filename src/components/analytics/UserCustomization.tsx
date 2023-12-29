import React from 'react'

const UserCustomizationComponent = () => {
  const userCustomizations: { title: string; source: string }[] = []

  return (
    <div className="mb-6">
      <h1 className="mx-4 mb-2 text-2xl font-semibold text-gray-700">Your Saved Customizations</h1>
      {userCustomizations && userCustomizations.length > 0 ? (
        userCustomizations.map((customization, index) => (
          <div key={index}>
            <p className="mx-4 text-sm text-gray-600">Choose a customization to view</p>
            <div>
              <p>{customization.title}</p>
              <p>{customization.source}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="mx-4 text-sm text-gray-600">
          You haven't saved any customization yet. Select the companies and datasources on the graph below and save your
          selections.{' '}
        </p>
      )}
    </div>
  )
}

export default UserCustomizationComponent
