const webdriver = require("selenium-webdriver");

const test = require("selenium-webdriver/testing");

const fake = require("./utils/fakeData");

const { describe, it, beforeEach } = test;

const { By } = webdriver;

const driver = new webdriver.Builder().forBrowser("chrome").build();

describe("App", () => {
  beforeEach(() => driver.get("http://localhost:3000"));
  it("search input should return card list", async function searchInput() {
    driver.findElement(By.id("input-search")).sendKeys(fake.nameKeyword);
    await driver.sleep(3000);
    const elements = await driver.findElements(By.id("card"));
    if (elements.length === 0) {
      const element = await driver.findElement(
        By.xpath("//*[contains(text(), 'List is empty')]")
      );
      if (element) console.log("Test passed");
      else throw Error("Empty list message not showed");
    } else {
      console.log("Test passed");
    }
    driver.quit();
  });
});
