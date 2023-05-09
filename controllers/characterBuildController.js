const cheerio = require('cheerio');
const axios = require('axios');

exports.getCharacterBuild = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://honkailab.com/characters/${req.params.character}`
    );
    const $ = cheerio.load(response.data);
    const lightConeElement = $('[data-elementor-type=wp-post]')
      .find(
        '.elementor-top-section.elementor-section-content-middle.elementor-section-boxed'
      )
      .find('.elementor-widget.elementor-widget-shortcode')
      .find('[data-elementor-type=page]');

    const bestLightCone = lightConeElement
      .first()
      .find('.jet-table')
      .find('thread');

    console.log(bestLightCone);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
