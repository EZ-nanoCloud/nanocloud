/**
 * Nanocloud turns any traditional software into a cloud solution, without
 * changing or redeveloping existing source code.
 *
 * Copyright (C) 2016 Nanocloud Software
 *
 * This file is part of Nanocloud.
 *
 * Nanocloud is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * Nanocloud is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General
 * Public License
 * along with this program.  If not, see
 * <http://www.gnu.org/licenses/>.
 */

import Ember from 'ember';
import ArrayDiff from 'nanocloud/lib/array-diff';

export default Ember.Controller.extend({
  groupController: Ember.inject.controller('protected.users.groups.group'),
  groupBinding: 'groupController.model',
  selectedImageLength: Ember.computed('group.images', function() {
    return this.get('group.images').toArray().length;
  }),

  actions: {
    addImage(image) {
      let group = this.get('group');
      let imageApps = image.get('apps').toArray();

      imageApps.forEach((imageApp) => {
        group.get('apps').pushObject(imageApp);
      });
      group.get('images').pushObject(image);
      group.save();
    },

    removeImage(image) {
      let group = this.get('group');
      let images = group.get('images');
      let imageApps = image.get('apps').toArray();

      imageApps.forEach((imageApp) => {
        group.get('apps').removeObject(imageApp);
      });
      images.removeObject(image);
      group.save();
    },

    addApp(app) {
      let group = this.get('group');

      group.get('apps').pushObject(app);
      group.save();
    },

    removeApp(app) {
      let group = this.get('group');
      let apps = group.get('apps');

      apps.removeObject(app);
      group.save();
    }
  },

  reset() {
    let allImages = this.get('images');
    let images = this.get('group.images');

    let availableImages = ArrayDiff.create({
      major: allImages,
      minor: images
    });

    this.set('availableImages', availableImages);
  }
});
