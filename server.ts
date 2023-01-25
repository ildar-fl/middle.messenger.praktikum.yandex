// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const express = require('express');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const path = require('path');

const app = express();

// @ts-expect-error TS(2304): Cannot find name '__dirname'.
app.use(express.static(path.join(__dirname, 'dist')));

// @ts-expect-error TS(2304): Cannot find name '__dirname'.
app.get("*", (_: any, res: any) => res.status(200).sendFile(path.join(__dirname, 'dist/index.html')));

// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Chat listening on port ${PORT}!`);
});
