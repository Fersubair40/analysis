import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Api from "../api/api";

export default function Dashboard({ history }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
        setLoading(true)
      const response = await Api.getUser();
      console.log(response.data);
      if (response && response.status === 401) {
        await Api.logOut();
        history.push("/login");
      }
      setLoading(false)
    })();
  }, []);

  return (
    <>
      <Spin spinning={loading} size="large">
        <div>Dashboard</div>
      </Spin>
    </>
  );
}
