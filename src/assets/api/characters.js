import axios from "axios";
export async function getList(page = 1, name = "", status = "") {
   try {
      let res = await axios(
         `character/?page=${page}&name=${name}&status=${status}`
      );
      return res;
   } catch (err) {
      console.log("err", err);
      return err;
   }
}
