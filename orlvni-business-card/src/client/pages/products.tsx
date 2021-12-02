import React, { useEffect } from 'react';

function Products({ data }) {
  return (
    <>
      <h1>Посмотри какие продукты я зафетчил из своей бд</h1>
      <ul>
        {data.map((item) => (
          <li key={item.product_id}>
            <h3>{item.product_name}</h3>
            <p>{item.product_desc}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/products_db`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Products;
