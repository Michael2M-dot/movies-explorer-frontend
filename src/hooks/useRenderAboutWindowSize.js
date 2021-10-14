// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

function useDataListForRender() {
  const [addRenderList, setAddToRenderList] = useState(false);
  const [baseCount, setBaseCount] = useState(null);
  const [step, setStep] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', getCountAndStepAboutWindow);
    }, 1000);

    return () => window.removeEventListener('resize', getCountAndStepAboutWindow);
  });

  const getCountAndStepAboutWindow = () => {
    if (window.innerWidth >= 1280) {
      setBaseCount(12);
      setStep(4);
    }
    if (window.innerWidth < 1280 && window.innerWidth >= 1040) {
      setBaseCount(9);
      setStep(3);
    }
    if (window.innerWidth < 1040 && window.innerWidth >= 768) {
      setBaseCount(6);
      setStep(2);
    }
    if (window.innerWidth < 768) {
      setBaseCount(5);
      setStep(1);
    }
  };

  const getRenderList = (initialDataList, baseStep, count) => {
    const listLength = initialDataList === null ? 0 : initialDataList.length;

    console.log(initialDataList);
    if (listLength <= count && listLength !== 0) {
      setAddToRenderList(false);
      return initialDataList;
    } else if (listLength === 0) {
      setAddToRenderList(false);
      return [];
    } else {
      let n = count || baseCount;

      for (let i = n; i < listLength; i += step) {
        if ((listLength - i) >= 0) {
          setAddToRenderList(true);
          n = i;
          break;
        } else {
          setAddToRenderList(false);
          n += (listLength - i);
        }
      }
      console.log('exit', initialDataList);
      return initialDataList.slice(0, n);
    }
  };
  return {
    getRenderList,
    addRenderList,
    getCountAndStepAboutWindow,
    step,
    baseCount,
  };
}

export default useDataListForRender;
