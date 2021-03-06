import {
  GET_CATEGORYS,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORYS_LOADING,
  SET_MODAL,
  ADD_MODAL,
} from "./../../action/admin/types.js";
const initialSate = {
  categorys: [],
  displayPromtmsg: "",
  modal: false,
  addModal: false,
};

export default function (state = initialSate, action) {
  switch (action.type) {
    case GET_CATEGORYS:
      console.log("hi from payload");
      console.log(action.payload);
      return {
        ...state,
        categorys: action.payload,
        //loading: false,
      };
    case DELETE_CATEGORY:
      console.log("del paylod in action", action);
      if (action.res.data == "Deleted") {
        console.log("inside the delete loop");
        return {
          ...state,
          categorys: state.categorys.filter(
            (category) => category.name != action.payload.name
          ),
          displayPromtmsg: "Deleted",
        };
      } else {
        return { ...state, displayPromtmsg: "CannotDelete", modal: true };
      }
    case ADD_CATEGORY:
      console.log("add paylod in action", action);
      if (action.res.data == "CannotAdd") {
        console.log("inside the add loop");
        return {
          ...state,
          addModal: true,
        };
      } else {
        return { ...state, categorys: [action.payload, ...state.categorys] };
      }
    // return {
    //   ...state,
    //   categorys: [action.payload, ...state.categorys],
    // };
    case SET_MODAL:
      return {
        ...state,
        modal: !state.modal,
      };
    case ADD_MODAL:
      return {
        ...state,
        addModal: !state.addModal,
      };
    case CATEGORYS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
