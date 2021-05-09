const shell = require("shelljs");
shell.cp("-R", "devops/_redirects", "dist/_redirects"); // netlify not working for dynamic urls

shell.exec(
  "netlify deploy --prod --dir dist --site 898a2626-61b0-4cad-a36e-eab4d1e31222 --open"
);
