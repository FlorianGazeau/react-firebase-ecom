import React from 'react';
import Button from '../Form/Button/Button';

const LoadMore = ({ onLoadMoreEvt = () => { } }) => {
  return (
    <Button onClick={() => onLoadMoreEvt()} className='btn-loadmore'>
      Load More
    </Button>
  );
}

export default LoadMore;
