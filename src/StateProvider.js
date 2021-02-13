import React, { useReducer } from 'react';

const initialState = {
  menus: {},
  diningHalls: [],
  foods: [],
  value: 0,
  dataSource: [],
  contentToDisplay: false,
  content: '',
  loading: true,
  meals: [],
  user: {}
}

const Ctx = React.createContext(initialState);

const StateProvider = (props) => {
	const [state, dispatch] = useReducer(
		(state, action) => {
			// write actions here
			switch(action.type)
      {
        case 'SET_MENU':
          return {
            ...state,
            menus: action.payload,
          }
        case 'UPDATE_COUNT':
          return {
            ...state,
            value: action.payload,
          }
        case 'ADD_MEAL':
          let meals = state.meals.slice()
          meals.push(action.payload)
          return {
            ...state,
            meals
          }
        case 'SET_MEALS':
          return {
            ...state,
            meals: action.payload.slice()
          }
        case 'REGISTER':
          return {
            ...state,
            user: action.payload
          }
        case 'SET_USER':
          return {
            ...state,
            user: action.payload
          }

        default:
          return state
      }
		},
		initialState
	);

	return (
		<Ctx.Provider value={{ state, dispatch }}>{props.children}</Ctx.Provider>
	);
};

export { Ctx, StateProvider };
