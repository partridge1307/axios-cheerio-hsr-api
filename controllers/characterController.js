const cheerio = require('cheerio');
const axios = require('axios');

const elementId = [
  { name: 'Physical', value: '2558' },
  { name: 'Wind', value: '2184' },
  { name: 'Quantum', value: '2193' },
  { name: 'Ice', value: '2187' },
  { name: 'Fire', value: '2196' },
  { name: 'Imaginary', value: '2190' },
  { name: 'Lightning', value: '2199' },
];

exports.getAllCharacters = async (req, res) => {
  try {
    const response = await axios.get(
      'https://honkailab.com/honkai-star-rail-characters/'
    );
    const $ = cheerio.load(response.data);

    const charactersWrapper = $('.elementor-element-6144a0a1')
      .find('.elementor-widget-container')
      .find('.jet-tabs__content-wrapper > div');

    let info = [];

    charactersWrapper.map((i, el) => {
      if (i !== 0) {
        $(el).attr('aria-hidden', false);

        const type = elementId.find(
          (val) => val.value === $(el).attr('data-template-id')
        )?.name;

        let names = $(el)
          .find(
            '.uc_post_list.uc-items-wrapper > div > .uc_post_list_content > div > .uc_post_list_title > a'
          )
          .text();

        names = names
          .replace(/(Build|build)/g, '')
          .split(' ')
          .slice(0, -1);

        info.push({
          type,
          characters: names,
        });
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        info,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getCharacterInfo = async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.prydwen.gg/star-rail/characters/${req.params.character}`
    );
    const $ = cheerio.load(response.data);

    const characterStats = $('#section-stats > .info-list.stats > div');

    let result = {};
    characterStats.map((i, el) => {
      if (i === 0) {
        const context = $(el).find('.stat-box > h5').text();

        let data = [];
        $(el)
          .find('.stat-box > div')
          .map((index, element) => {
            const category = $(element).find('.hsr-stat > span').text();
            const details = $(element).find('.details').text();

            data.push({ category, details });
          });

        result.stats = { context, data };
      } else if (i === 1) {
        const context = $(el).find('.stat-box > h5').text();

        let data = [];
        $(el)
          .find('.stat-box > div > ul > li')
          .map((index, element) => {
            const item = $(element).find('.hsr-name > span').text();
            let cost = $(element).text().split(/ +/).pop();

            data.push({ item, cost });
          });

        result.materials = { context, data };
      }
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
