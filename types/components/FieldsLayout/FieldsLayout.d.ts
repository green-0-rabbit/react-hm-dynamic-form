import { FC, ReactElement } from "react";
interface IFieldsLayout {
    groupName: string;
    component?: ReactElement;
}
declare const FieldsLayout: FC<IFieldsLayout>;
export default FieldsLayout;
