import Axios from 'axios';
import React, { useEffect, useState } from 'react';

const Subscribe = ({ userTo, userFrom }) => {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const variable = {
      userTo,
    };

    Axios.post('/api/subscribe/subscribeNumber', variable).then((response) => {
      if (response.data.success) {
        setSubscribeNumber(response.data.subscribeNumber);
      } else {
        alert('구독자 수 정보를 받아오지 못했습니다.');
      }
    });

    const subscribedVariable = {
      userTo,
      userFrom,
    };

    Axios.post('/api/subscribe/subscribed', subscribedVariable).then(
      (response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert('정보를 받아오지 못했습니다.');
        }
      }
    );
  });

  const onSubscribe = () => {
    const subscribedVariable = {
      userTo,
      userFrom,
    };

    if (subscribed) {
      Axios.post('/api/subscribe/unSubscribe', subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber((prevNumber) => prevNumber - 1);
            setSubscribed((prevState) => !prevState);
          } else {
            alert('구독 취소에 실패했습니다.');
          }
        }
      );
    } else {
      Axios.post('/api/subscribe/subscribe', subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber((prevNumber) => prevNumber + 1);
            setSubscribed((prevState) => !prevState);
          } else {
            alert('구독 하기에 실패했습니다.');
          }
        }
      );
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000'}`,
          borderRadius: '4px',
          color: '#ffffff',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
        onClick={onSubscribe}
      >
        {subscribeNumber} {subscribed ? 'Subscribed' : 'subscribe'}
      </button>
    </div>
  );
};

export default Subscribe;
