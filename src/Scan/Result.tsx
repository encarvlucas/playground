import PropTypes from 'prop-types';

const Result = ({ result }) => (
  <li>
    {result.codeResult?.code ?? result} [{result.codeResult?.format}]
  </li>
);

Result.propTypes = {
  result: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default Result;