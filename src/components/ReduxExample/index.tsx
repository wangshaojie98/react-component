{
  const initialState = {
    id: null,
    name: '',
    properties: {},
  };
  
  const generateID = () => Math.floor(Math.random() * 1000);
  type Action = {
    type: string;
    [key: string]: any
  }
  const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case 'createID':
        return {
          ...state,
          id: generateID(),
        };
      case 'setName':
        return {
          ...state,
          name: action.name,
        };
      case 'addProperty':
        return {
          ...state,
          properties: {
            ...state.properties,
            [action.propertyName]: action.propertyValue,
          },
        };
      case 'removeProperty':
        return {
          ...state,
          properties: Object.keys(state.properties).reduce((acc: any, key: any) => {
            if (key !== action.propertyName) acc[key] = (state.properties as any)[key] ;
            return acc;
          }, {}),
        };
      default:
        return state;
    }
  };
}

// Redux 编写可读的 reducer
{
  type InitialState = {
    id: null | string;
    name: string;
    properties: {
      [key: string]: any
    }
  }

  type Action = {
    type: string;
    payload: any
  }

  const initialState: InitialState = {
    id: null,
    name: '',
    properties: {},
  };
  
  const ACTION_TYPES = {
    CREATE_ID: 'createID',
    SET_NAME: 'setName',
    ADD_PROPERTY: 'addProperty',
    REMOVE_PROPERTY: 'removeProperty'
  };
  
  const generateID = () => Math.floor(Math.random() * 1000);
  
  const createID = (state: InitialState) => ({
    ...state,
    id: generateID(),
  });
  
  const setName = (state: InitialState, { name }: { name: string}) => ({
    ...state,
    name,
  });
  
  const addProperty = (state: InitialState, { propertyName, propertyValue }: any) => ({
    ...state,
    [propertyName]: propertyValue,
  });
  
  const removeProperty = (state: InitialState, { propertyName }: any) => {
    const properties = Object.keys(state.properties).reduce((acc: any, key) => {
      if (key !== propertyName) acc[key] = (state.properties as any)[key];
      return acc;
    }, {});
    return { ...state, properties };
  };
  
  const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case ACTION_TYPES.CREATE_ID:
        return createID(state);
      case ACTION_TYPES.SET_NAME:
        return setName(state, action.payload);
      case ACTION_TYPES.ADD_PROPERTY:
        return addProperty(state, action.payload);
      case ACTION_TYPES.REMOVE_PROPERTY:
        return removeProperty(state, action.payload);
      default:
        return state;
    }
  };
}
/**
 * 封装Action.type
 * 封装reducer的每个函数
 */
export {}