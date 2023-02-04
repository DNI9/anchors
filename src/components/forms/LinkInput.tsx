import { SocialTitles } from "~/constants/app";

const TitleSuggestionsList = () => {
  return (
    <datalist id="title-list">
      {SocialTitles.map((title) => (
        <option key={title} value={title} />
      ))}
    </datalist>
  );
};

export const LinkInput = () => {
  return (
    <div className="flex gap-2">
      <div className="form-control w-full basis-1/3">
        <label className="label" htmlFor="title">
          <span className="label-text">Title</span>
        </label>
        <input
          required
          type="text"
          placeholder="Title"
          className="input-bordered input-primary input w-full"
          name="title"
          id="title"
          list="title-list"
        />
        <TitleSuggestionsList />
      </div>

      <div className="form-control w-full">
        <label className="label" htmlFor="link1">
          <span className="label-text">Link 1</span>
        </label>
        <input
          required
          type="url"
          id="link1"
          placeholder="Paste or type url"
          className="input-bordered input-primary input w-full"
        />
      </div>
    </div>
  );
};
