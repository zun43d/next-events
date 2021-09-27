import classes from './comment-list.module.css';

export default function CommentList(props) {
	const { items } = props;

	return (
		<ul className={classes.comments}>
			{items ? (
				items.map((item) => (
					<li key={item._id}>
						<p>{item.text}</p>
						<div>
							By <address>{item.name}</address>
						</div>
					</li>
				))
			) : (
				<div>Loading...</div>
			)}
		</ul>
	);
}
