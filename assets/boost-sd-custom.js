/*********************** Custom JS for Boost AI Search & Discovery  ************************/

const customize = {
   removeSwatchesLimit: (componentRegistry) => {
      componentRegistry.useComponentPlugin('ProductSwatch', {
         name: 'Customize swatches',
         enabled: true,
         apply: () => ({
            props: (props) => {
               props.maxItem = 100; // Show all swatches by increasing number of swatches displayed to 100 (optional)
               return props;
            }
         }),
      });
   },
};

window.__BoostCustomization__ = (window.__BoostCustomization__ ?? []).concat([
   customize.removeSwatchesLimit,
]);