import pagination from './pagination';
import header from './header';
import tableFormat from './table-format';
import conceptSemaphores from './concept-semaphores';
import metricSemaphores from './metric-semaphores';

const definition = {
  component: 'accordion',
  items: {
    data: {
      items: {
        dimensions: {
          disabledRef: ''
        },
        measures: {
          disabledRef: ''
        }
      },
      uses: 'data'
    },
    sorting: {
      uses: 'sorting'
    },
    settings: {
      items: {
        ConceptSemaphores: conceptSemaphores,
        Formatted: tableFormat,
        Header: header,
        MetricSemaphores: metricSemaphores,
        Pagination: pagination
      },
      uses: 'settings'
    },
    about: {
      component: 'items',
      label: 'About',
      items: {
        header: {
          label: 'P&L pivot',
          style: 'header',
          component: 'text'
        },
        paragraph1: {
          label: `P&L pivot is a Qlik Sense extension which allows you to display Profit & Loss
            reporting with color and font customizations.`,
          component: 'text'
        },
        paragraph2: {
          label: 'P&L pivot is based upon an extension created by Ivan Felipe Asensio.',
          component: 'text'
        }
      }
    }
  },
  type: 'items'
};

export default definition;
