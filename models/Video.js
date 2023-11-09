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
    this.toc = []; // Initialize an empty array for the table of contents
    this.modifySummary();  // Call the method to modify the summary and generate TOC
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
      const { modifiedSummary, toc } = this.generateTOCAndModifySummary(this.summary);
      this.summary = modifiedSummary;
      this.toc = toc; // Assign the generated TOC to the class property
    }
  }

  generateTOCAndModifySummary(summary) {
    const toc = [];
    const modifiedSummary = summary.replace(/(\d+)-([^<]+)/g, (match, p1, p2) => {
      // Check if the match includes a digit followed by a dash
      // if (!match.includes('-')) {
      //   return match; // If it doesn't include a dash, return the match unchanged
      // }

      const depth = parseInt(p1, 10); // Convert the digit(s) to an actual number

      // Check if the depth is within the desired range of 2-5
      if (depth < 2 || depth > 5) {
        return match; // If it's not, return the match unchanged
      }

      const value = p2.trim();
      const id = value.toLowerCase().replace(/\s+/g, '-')
      
      // Push an object representing the heading to the TOC array
      toc.push({ value, depth, url: `#${id}` });

      // Return the modified string with 'h' tags
      return `<h${depth} id="${id}">${value}</h${depth}>`;
    });

    return { modifiedSummary, toc };
  }





}

export default Video;
