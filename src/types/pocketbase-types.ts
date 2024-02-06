/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Boards = "boards",
	Columns = "columns",
	Issues = "issues",
	Projects = "projects",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type BoardsRecord = {
	columns: RecordIdString[]
	project: RecordIdString
}

export type ColumnsRecord = {
	board: RecordIdString
	issues?: RecordIdString[]
	title: string
}

export enum IssuesPriorityOptions {
	"highest" = "highest",
	"high" = "high",
	"medium" = "medium",
	"low" = "low",
	"lowest" = "lowest",
}

export enum IssuesTypeOptions {
	"task" = "task",
	"bug" = "bug",
	"story" = "story",
}
export type IssuesRecord = {
	column: RecordIdString
	description?: HTMLString
	priority?: IssuesPriorityOptions
	reporter: RecordIdString
	title: string
	type?: IssuesTypeOptions
}

export type ProjectsRecord = {
	board?: RecordIdString
	description?: string
	key: string
	members: RecordIdString[]
	name: string
}

export type UsersRecord = {
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type BoardsResponse<Texpand = unknown> = Required<BoardsRecord> & BaseSystemFields<Texpand>
export type ColumnsResponse<Texpand = unknown> = Required<ColumnsRecord> & BaseSystemFields<Texpand>
export type IssuesResponse<Texpand = unknown> = Required<IssuesRecord> & BaseSystemFields<Texpand>
export type ProjectsResponse<Texpand = unknown> = Required<ProjectsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	boards: BoardsRecord
	columns: ColumnsRecord
	issues: IssuesRecord
	projects: ProjectsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	boards: BoardsResponse
	columns: ColumnsResponse
	issues: IssuesResponse
	projects: ProjectsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'boards'): RecordService<BoardsResponse>
	collection(idOrName: 'columns'): RecordService<ColumnsResponse>
	collection(idOrName: 'issues'): RecordService<IssuesResponse>
	collection(idOrName: 'projects'): RecordService<ProjectsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
