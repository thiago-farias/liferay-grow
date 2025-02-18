import React, { useEffect, useReducer, useState } from 'react';

import { initializeApollo } from '@/graphql/nextApollo';
import { allKnowledgeData } from '@/graphql/queries';
import { SkillManagement, Types } from '@/types';

import LoadingWrapper from '../loading';
import SkillContext, { initialState, mainReducer } from './SkillContext';

type AppProvider = {
  defaultState?: SkillManagement;
  fetchData?: boolean;
};

const AppProvider: React.FC<AppProvider> = ({
  children,
  fetchData = true,
  defaultState = {},
}) => {
  const client = initializeApollo(null, true);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(mainReducer, {
    ...initialState,
    ...defaultState,
  });

  const fetchKnowledgeData = async () => {
    setLoading(true);
    const { data } = await client.query({
      query: allKnowledgeData,
    });

    dispatch({
      payload: data,
      type: Types.EDIT_KNOWLEDGE_DATA,
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      fetchKnowledgeData();
    }
  }, []);

  return (
    <SkillContext.Provider value={{ dispatch, state }}>
      {loading ? <LoadingWrapper /> : children}
    </SkillContext.Provider>
  );
};

export default AppProvider;
