class Video {
  
  constructor(data, locale) {
    locale = 'fr'
    this.id = data.id;
    this.slug = data.slug;
    this.title = this.getTitle(data, locale);
    this.description = this.getDescription(data, locale);
    this.summary = this.getSummary(data, locale);
    // add other properties as needed
  }

  getTitle(data, locale) {
    // get the title based on the current locale
    return data[`title_${locale}`];
  }

  getDescription(data, locale) {
    // get the description based on the current locale
    
    return data[`description_${locale}`];
  }

  getSummary(data, locale) {
    // get the summary based on the current locale
    return data[`summary_${locale}`];
  }

  // add other methods as needed
}

export default Video;