import React from 'react'
import { Card } from '@tremor/react'

export default function DatasourcePage() {
  return (
    <>
      <br />
      <Card style={{ backgroundColor: 'white' }}>
        <h1>Datasource</h1>
        {/* <h1>Datasource {datasource.id}</h1>
                <p>{datasource.name}</p>
                <p>{datasource.description}</p>
                <p>{datasource.isActive ? 'Active' : 'Inactive'}</p> */}
      </Card>
    </>
  )
}

// export async function getServerSideProps(context : any) {
//   const { id } = context.params;

//   // Fetch the datasource data from the API
//   const res = await fetch(`http://localhost:3000/api/datasources/${id}`);
//   const datasource = await res.json();

//   return {
//     props: {
//       datasource,
//     },
//   };
// }
