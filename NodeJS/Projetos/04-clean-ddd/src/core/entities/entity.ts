import { UniqueEntityID } from "./unique-entity-id";

export class Entity<Props> {
	private _id: UniqueEntityID;
	protected props: Props;

	get id() {
		return this._id;
	}

	constructor(props: Props, id?: UniqueEntityID) {
		this._id = id ?? new UniqueEntityID();
		this.props = props;
	}
}
