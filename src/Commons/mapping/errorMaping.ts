import InvariantError from "@commons/exceptions/InvariantError"


export const mapJsonError = () =>{
  throw new InvariantError("Invalid request payload JSON");
}
