import { ACTIVE_PAGE } from "../constants/actionTypes";

const activePage = data => {
  return {
    type: ACTIVE_PAGE,
    data
  };
};

export default activePage;
