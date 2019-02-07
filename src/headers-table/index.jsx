import React from 'react';
import PropTypes from 'prop-types';
import ExportColumnHeader from './export-column-header.jsx';
import ColumnHeader from './column-header.jsx';
import MeasurementColumnHeader from './measurement-column-header.jsx';
import { injectSeparators } from '../utilities';

const HeadersTable = ({ data, general, styling }) => {
  const baseCSS = {
    backgroundColor: styling.headerOptions.colorSchema,
    color: styling.headerOptions.textColor,
    fontFamily: styling.options.fontFamily,
    textAlign: styling.headerOptions.alignment
  };

  const {
    dimension1,
    dimension2,
    measurements
  } = data.headers;

  const hasSecondDimension = Boolean(dimension2);

  return (
    <div className="header-wrapper">
      <table className="header">
        <tbody>
          <tr>
            <ExportColumnHeader
              allowExcelExport={general.allowExcelExport}
              baseCSS={baseCSS}
              hasSecondDimension={hasSecondDimension}
              styling={styling}
              title={dimension1[0].name}
            />
            {!hasSecondDimension && injectSeparators(measurements, styling.useSeparatorColumns)
              .map(measurementEntry => (
                <MeasurementColumnHeader
                  key={`${measurementEntry.displayValue}-${measurementEntry.name}`}
                  measurement={measurementEntry}
                />
              ))
            }
            {hasSecondDimension && injectSeparators(dimension2, styling.useSeparatorColumns).map(entry => {
              if (entry.isSeparator) {
                const separatorStyle = {
                  color: 'white',
                  fontFamily: styling.options.fontFamily,
                  fontSize: `${13 + styling.headerOptions.fontSizeAdjustment}px`
                };

                return (
                  <th
                    className="empty"
                    style={separatorStyle}
                  >
                    *
                  </th>
                );
              }
              return (
                <ColumnHeader
                  baseCSS={baseCSS}
                  cellSuffix={general.cellSuffix}
                  colSpan={measurements.length}
                  key={entry.displayValue}
                  styling={styling}
                  title={entry.displayValue}
                />
              );
            })}
          </tr>
          {hasSecondDimension && (
            <tr>
              {injectSeparators(dimension2, styling.useSeparatorColumns).map(dimensionEntry => {
                if (dimensionEntry.isSeparator) {
                  const separatorStyle = {
                    color: 'white',
                    fontFamily: styling.options.fontFamily,
                    fontSize: `${12 + styling.headerOptions.fontSizeAdjustment}px`
                  };

                  return (
                    <th
                      className="empty"
                      style={separatorStyle}
                    >
                      *
                    </th>
                  );
                }
                return measurements.map(measurementEntry => (
                  <MeasurementColumnHeader
                    baseCSS={baseCSS}
                    dimensionEntry={dimensionEntry}
                    general={general}
                    hasSecondDimension={hasSecondDimension}
                    key={`${measurementEntry.displayValue}-${measurementEntry.name}-${dimensionEntry.name}`}
                    measurement={measurementEntry}
                    styling={styling}
                  />
                ));
              })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

HeadersTable.propTypes = {
  data: PropTypes.shape({
    headers: PropTypes.shape({
      dimension1: PropTypes.array,
      dimension2: PropTypes.array,
      measurements: PropTypes.array
    })
  }).isRequired,
  general: PropTypes.shape({}).isRequired,
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({}),
    options: PropTypes.shape({})
  }).isRequired
};

export default HeadersTable;
