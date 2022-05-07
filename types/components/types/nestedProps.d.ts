/**
 *  @see https://gist.github.com/staltz/368866ea6b8a167fbdac58cddf79c1bf?permalink_comment_id=3805194#gistcomment-3805194
 * @see https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
 * @see https://steveholgado.com/typescript-types-from-arrays/
 */
/**
 *  not implemented yet @see https://github.com/microsoft/TypeScript/issues/34933
 */
export declare type NestedKeyOf<DynamicValue extends object> = {
    [Key in keyof DynamicValue & (string | number)]: DynamicValue[Key] extends any[] ? `${Key}` : DynamicValue[Key] extends object ? `${Key}.${NestedKeyOf2<DynamicValue[Key]>}` : `${Key}`;
}[keyof DynamicValue & (string | number)];
declare type NestedKeyOf2<DynamicValue extends object> = {
    [Key in keyof DynamicValue & (string | number)]: DynamicValue[Key] extends any[] ? `${Key}` : DynamicValue[Key] extends object ? `${Key}.${NestedKeyOf3<DynamicValue[Key]>}` : `${Key}`;
}[keyof DynamicValue & (string | number)];
declare type NestedKeyOf3<DynamicValue extends object> = {
    [Key in keyof DynamicValue & (string | number)]: DynamicValue[Key] extends any[] ? `${Key}` : DynamicValue[Key] extends object ? `${Key}.${NestedKeyOf4<DynamicValue[Key]>}` : `${Key}`;
}[keyof DynamicValue & (string | number)];
declare type NestedKeyOf4<DynamicValue extends object> = {
    [Key in keyof DynamicValue & (string | number)]: DynamicValue[Key] extends any[] ? `${Key}` : DynamicValue[Key] extends object ? `${Key}.${NestedKeyOf5<DynamicValue[Key]>}` : `${Key}`;
}[keyof DynamicValue & (string | number)];
declare type NestedKeyOf5<DynamicValue extends object> = {
    [Key in keyof DynamicValue & (string | number)]: `${Key}`;
}[keyof DynamicValue & (string | number)];
export declare const flattenObj: <T extends Record<string, any>>(obj: T, parent?: string | undefined, res?: any, index?: number) => NestedKeyOf<T>;
/** Union of primitives to skip with deep omit utilities. */
export declare type Primitive = string | number | boolean | undefined | null;
/** Variable Kind */
declare type VariableKind = string | number | boolean;
/**
 *  @see https://gist.github.com/ahuggins-nhs/826906a58e4c1e59306bc0792e7826d1
 */
/** Deeply omit members of an array of interface or array of type. */
export declare type DeepOmitArray<T extends object[], K> = {
    [P in keyof T]: DeepOmit<T[P], K>;
};
export declare type DeepOmit<T, K> = T extends Primitive ? T : {
    [P in Exclude<keyof T, K>]: T[P] extends infer TP ? TP extends Primitive[] ? TP : TP extends object[] ? DeepOmitArray<TP, K> : TP extends Primitive ? TP : DeepOmit<TP, K> : never;
};
export declare type DeepOmitVariableKind<T, U extends VariableKind | Primitive[] | Record<string, any>[] | any[]> = {
    [P in Exclude<keyof T, GetKeyKind<T, U>>]: T[P] extends infer TP ? TP extends any[] ? TP : TP extends object ? DeepOmitVariableKind<TP, U> : TP : never;
};
declare type GetKeyKind<T, U extends VariableKind | Primitive[] | Record<string, any>[]> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
export declare type DeepNonNullable<T> = T extends Primitive ? T : {
    [P in keyof T]: T[P] extends infer TP ? TP extends object ? DeepNonNullable<TP> : NonNullable<TP> : never;
};
/**
 *  Deep remove undefined
 */
export declare type DeepRequired<T> = {
    [P in keyof T]-?: DeepRequired<T[P]>;
};
export {};
/**
 *  below is a test for NestedKeyOf
 */
