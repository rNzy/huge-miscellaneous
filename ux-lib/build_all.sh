#!/bin/bash

entities=('cmb' 'cmbnew' 'cmso' 'abei' 'abp' 'abs' 'azb' 'azb_old' 'bpe' 'cmbpro' 'cmsopro' 'back-office' 'pdt')
for entity in "${entities[@]}"
do
  npm run build:$entity
done
