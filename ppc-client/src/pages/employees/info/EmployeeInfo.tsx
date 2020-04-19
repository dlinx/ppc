import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface RouteParams {
  id: string;
}
interface Props extends RouteComponentProps<RouteParams> {}

const EmployeeInfo: React.FC<Props> = (props) => {
  console.log(props.match.params);
  return <>welcome {props.match.params.id}</>;
};
export default EmployeeInfo;
