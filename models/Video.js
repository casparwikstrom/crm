class Video {
  constructor(data, locale) {
    this.url = data.url;
    this.video_info = data.video_info;
    this.keywords = data.keywords;
    this.slug = data.slug;
    this.id = data.id;
    this.updated_at = data.updated_at;
    this.created_at = data.created_at;
    this.name = this.getName(data, locale);
    this.description = this.getDescription(data, locale);
    this.summary = this.getSummary(data, locale);
    this.modifySummary();  // Call the method to modify the summary
    // add other properties as needed
  }

  getName(data, locale) {
    const newName = locale !== 'sv' && data[`name_${locale}`] ? data[`name_${locale}`] : data.name;
    return newName;
  }

  getDescription(data, locale) {
    const newDesc = locale !== 'sv' && data[`description_${locale}`] ? data[`description_${locale}`] : data.description;
    return newDesc;
  }

  getSummary(data, locale) {
    const newSum = locale !== 'sv' && data[`summary_${locale}`] ? data[`summary_${locale}`] : data.summary;
    return newSum;
  }

  modifySummary() {
    if (this.summary) {
      this.summary = this.summary.replace(/<h1>(\d)-([^<]+)<\/h1>/g, function (match, p1, p2) {
        return `<h${p1}>${p2}</h${p1}>`;
      });
    }
  }
}

export default Video;
