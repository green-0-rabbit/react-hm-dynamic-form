import { FC, ReactElement } from "react";
interface IISList {
    inputType: string;
    list?: ReactElement<any>;
    field?: ReactElement<any>;
}
declare const ISList: FC<IISList>;
export default ISList;
