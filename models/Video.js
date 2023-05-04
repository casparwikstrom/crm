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
    // add other properties as needed
  }

  getName(data, locale) {
    // get the title based on the current locale
    const newName = locale !== 'en' && data[`name_${locale}`] ? data[`name_${locale}`] : data.name;
    return newName;
  }

  getDescription(data, locale) {
    // get the description based on the current locale
    const newDesc = locale !== 'en' && data[`description_${locale}`] ? data[`description_${locale}`] : data.description;
    return newDesc;
  }

  getSummary(data, locale) {
    const newSum = locale !== 'en' && data[`summary_${locale}`] ? data[`summary_${locale}`] : data.summary;
    return newSum;
  }

  // add other methods as needed
}

export default Video;