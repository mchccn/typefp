export type Decrement<X extends number> = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25][X];
export type CreateArray<L extends number> = L extends -1 | 0 ? [] : [number, ...CreateArray<Decrement<L>>];
export type CreateMatrix<Width extends number, Height extends number> = Height extends -1 | 0 ? [] : [CreateArray<Width>, ...CreateMatrix<Width, Decrement<Height>>];
export type GenericMatrix = CreateMatrix<number, number>;