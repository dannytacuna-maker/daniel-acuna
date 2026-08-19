type Review = {
  name: string;
  when: string;
  text: string;
};

export function ReviewReel({ reviews }: { reviews: Review[] }) {
  const loop = [...reviews, ...reviews];

  return (
    <div className="vx-reel" aria-label="Opiniones en Google">
      <div className="vx-reel-track">
        {loop.map((review, index) => (
          <article className="vx-review" key={`${review.name}-${index}`}>
            <span className="vx-stars" aria-label="5 de 5">
              ★★★★★
            </span>
            <p>{review.text}</p>
            <b>{review.name}</b>
            <small>Google · {review.when}</small>
          </article>
        ))}
      </div>
    </div>
  );
}
