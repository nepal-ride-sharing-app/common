import { Db, Collection, Document } from 'mongodb';

export type MongoDB = Db;
export type MongoCollection = Collection<Document>;
export type MongoDocument = Document;
