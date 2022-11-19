import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Navigate

export const navigate = (path: string) => {
  console.log(path);
  const navigate = useNavigate();
  return navigate(path);
};

// DISPATCH
export const dispatch = useDispatch();

// SELECTOR
//export  const selector =  useSelector();

// fecha actual
export const DateNow = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateCurrenci = `${year}-${month}-${day}`;
  return dateCurrenci;
}


//const today = new Date();
// obtener la fecha de hoy en formato `MM/DD/YYYY`
//export const DateNow = today.toLocaleDateString("en-US");
