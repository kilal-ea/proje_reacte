// userReducer.js
const initialState = {
    user: null,
    contentc:<h1 className="text-white text-3xl font-bold">Welcome in china</h1>,
    codetr:null,
    codeatt:null,
    codebon:null,
    contentm:<h1 className="text-white text-3xl font-bold">Welcome in morocco</h1>,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'contentc':
        return { ...state, contentc: action.payload };
      case 'contentm':
        return { ...state, contentm: action.payload };
      case 'codetr':
        return { ...state, codetr: action.payload };
      case 'codeatt':
        return { ...state, codeatt: action.payload };
      case 'codebon':
        return { ...state, codebon: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  