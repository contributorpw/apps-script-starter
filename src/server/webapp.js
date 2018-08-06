export const doGet = () => {
  const title = 'Google Apps Script';
  const fileName = 'index.html';
  return HtmlService.createTemplateFromFile(fileName)
    .evaluate()
    .setTitle(title)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
};

export const include = filename => HtmlService.createHtmlOutputFromFile(filename).getContent();
