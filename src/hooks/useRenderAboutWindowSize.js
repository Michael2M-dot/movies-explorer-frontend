// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {
  BASE_COUNT_1280,
  BASE_STEP_1280,
  BASE_COUNT_1040,
  BASE_STEP_1040,
  BASE_COUNT_768,
  BASE_STEP_768,
  BASE_COUNT_320,
  BASE_STEP_320,
} from '../utils/constants';

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
      setBaseCount(BASE_COUNT_1280);
      setStep(BASE_STEP_1280);
    }
    if (window.innerWidth < 1280 && window.innerWidth >= 1040) {
      setBaseCount(BASE_COUNT_1040);
      setStep(BASE_STEP_1040);
    }
    if (window.innerWidth < 1040 && window.innerWidth >= 768) {
      setBaseCount(BASE_COUNT_768);
      setStep(BASE_STEP_768);
    }
    if (window.innerWidth < 768) {
      setBaseCount(BASE_COUNT_320);
      setStep(BASE_STEP_320);
    }
  };

  const getRenderList = (initialDataList, baseStep, count) => {
    const listLength = initialDataList === null ? 0 : initialDataList.length;

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
