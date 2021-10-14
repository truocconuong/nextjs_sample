import { SingpassActions } from '@redux/actions';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'; import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toObjectQueryParams } from '../utils/helpers/Tool.util';
;
function Callback(props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    const query = window?.location?.search || "";
    const queryObject = toObjectQueryParams(query?.substr(1, query.length));
    const code = queryObject?.code || "";
    if (code) {
      dispatch(SingpassActions.getPersonalInformation(code, (res) => {
        if (res?.text) {
          localStorage.setItem("hasErrorSingpass", "false");
          setLoading(false);
          router.push("/personal-information");
        }
      }))
    } else {
      setLoading(false);
      localStorage.setItem("hasErrorSingpass", "true");
      router.push("/personal-information");
    }
  }, [])
  return <div className="spinning"><Spin spinning={loading} /></div>
}

export default Callback;