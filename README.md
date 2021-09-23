# sdet-test-ruangguru
This is the repo for Ruang Guru's SDET test.
<ol>
<li>Git clone: `git clone https://github.com/gloriamonika/sdet-test-ruangguru.git`</li>
<li>Install all dependencies: `npm i`</li>
<li>Run test suite: `npm test run`</li>
</ol>

# Troubleshooting
If `npm i` does not work, install the dependencies separately:
<ol>
<li>Mocha: `npm i mocha`</li>
<li>Chai: `npm i chai`</li>
<li>Supertest: `npm i supertest`</li>
</ol>

# Project structure
`page`: The place where I put the page to access the API to avoid putting the address on test suite.
`data`: Contains validation schema for returned JSON data.
`test_script`: Contains the actual test script written for the API.
<br>
This project uses Mocha and chai with npm as the package manager. 