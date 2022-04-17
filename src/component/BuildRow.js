import ".././App.css";

function BuildRows ({element,index,key}) {

    console.log("Table Data",element);
    return (
      <tr className="text-light">
        <th scope="row">{index+1}</th>
        <td>{element.email}</td>
        <td>{element.name}</td>
        <td>{element.keyword}</td>
        <td>{element.count}</td>
      </tr>
    );
  };
  
  export default BuildRows;