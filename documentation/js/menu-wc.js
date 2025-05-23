'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">pro-skill documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminModule-0fbbc11ff7190448d0c12b8e29e032bfa91b27d29b560538454140665fcbe815f9bab26ba497d8e89e420dd9a1d63da9da3f0492ffb9239c70d674fa3b4f3337"' : 'data-bs-target="#xs-controllers-links-module-AdminModule-0fbbc11ff7190448d0c12b8e29e032bfa91b27d29b560538454140665fcbe815f9bab26ba497d8e89e420dd9a1d63da9da3f0492ffb9239c70d674fa3b4f3337"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-0fbbc11ff7190448d0c12b8e29e032bfa91b27d29b560538454140665fcbe815f9bab26ba497d8e89e420dd9a1d63da9da3f0492ffb9239c70d674fa3b4f3337"' :
                                            'id="xs-controllers-links-module-AdminModule-0fbbc11ff7190448d0c12b8e29e032bfa91b27d29b560538454140665fcbe815f9bab26ba497d8e89e420dd9a1d63da9da3f0492ffb9239c70d674fa3b4f3337"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminModule-0fbbc11ff7190448d0c12b8e29e032bfa91b27d29b560538454140665fcbe815f9bab26ba497d8e89e420dd9a1d63da9da3f0492ffb9239c70d674fa3b4f3337"' : 'data-bs-target="#xs-injectables-links-module-AdminModule-0fbbc11ff7190448d0c12b8e29e032bfa91b27d29b560538454140665fcbe815f9bab26ba497d8e89e420dd9a1d63da9da3f0492ffb9239c70d674fa3b4f3337"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-0fbbc11ff7190448d0c12b8e29e032bfa91b27d29b560538454140665fcbe815f9bab26ba497d8e89e420dd9a1d63da9da3f0492ffb9239c70d674fa3b4f3337"' :
                                        'id="xs-injectables-links-module-AdminModule-0fbbc11ff7190448d0c12b8e29e032bfa91b27d29b560538454140665fcbe815f9bab26ba497d8e89e420dd9a1d63da9da3f0492ffb9239c70d674fa3b4f3337"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-647f7b1d7be3ad0b0c8232c59d24b6be40719d5e70f6080f544e22217939237ca63a5d043d444a9a205a0a28727b159f1763281754ab044a94df8b07ce3f0bae"' : 'data-bs-target="#xs-controllers-links-module-AppModule-647f7b1d7be3ad0b0c8232c59d24b6be40719d5e70f6080f544e22217939237ca63a5d043d444a9a205a0a28727b159f1763281754ab044a94df8b07ce3f0bae"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-647f7b1d7be3ad0b0c8232c59d24b6be40719d5e70f6080f544e22217939237ca63a5d043d444a9a205a0a28727b159f1763281754ab044a94df8b07ce3f0bae"' :
                                            'id="xs-controllers-links-module-AppModule-647f7b1d7be3ad0b0c8232c59d24b6be40719d5e70f6080f544e22217939237ca63a5d043d444a9a205a0a28727b159f1763281754ab044a94df8b07ce3f0bae"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-647f7b1d7be3ad0b0c8232c59d24b6be40719d5e70f6080f544e22217939237ca63a5d043d444a9a205a0a28727b159f1763281754ab044a94df8b07ce3f0bae"' : 'data-bs-target="#xs-injectables-links-module-AppModule-647f7b1d7be3ad0b0c8232c59d24b6be40719d5e70f6080f544e22217939237ca63a5d043d444a9a205a0a28727b159f1763281754ab044a94df8b07ce3f0bae"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-647f7b1d7be3ad0b0c8232c59d24b6be40719d5e70f6080f544e22217939237ca63a5d043d444a9a205a0a28727b159f1763281754ab044a94df8b07ce3f0bae"' :
                                        'id="xs-injectables-links-module-AppModule-647f7b1d7be3ad0b0c8232c59d24b6be40719d5e70f6080f544e22217939237ca63a5d043d444a9a205a0a28727b159f1763281754ab044a94df8b07ce3f0bae"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-7a9f3f0e820abe884adeb896b740d477b4368406f32cd30fc6a854adf93cc0435df5441d9df07d16d6ad792dd6671dc3cb61c1f0a744c390bc7e14e317ce06f3"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-7a9f3f0e820abe884adeb896b740d477b4368406f32cd30fc6a854adf93cc0435df5441d9df07d16d6ad792dd6671dc3cb61c1f0a744c390bc7e14e317ce06f3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-7a9f3f0e820abe884adeb896b740d477b4368406f32cd30fc6a854adf93cc0435df5441d9df07d16d6ad792dd6671dc3cb61c1f0a744c390bc7e14e317ce06f3"' :
                                            'id="xs-controllers-links-module-AuthModule-7a9f3f0e820abe884adeb896b740d477b4368406f32cd30fc6a854adf93cc0435df5441d9df07d16d6ad792dd6671dc3cb61c1f0a744c390bc7e14e317ce06f3"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-7a9f3f0e820abe884adeb896b740d477b4368406f32cd30fc6a854adf93cc0435df5441d9df07d16d6ad792dd6671dc3cb61c1f0a744c390bc7e14e317ce06f3"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-7a9f3f0e820abe884adeb896b740d477b4368406f32cd30fc6a854adf93cc0435df5441d9df07d16d6ad792dd6671dc3cb61c1f0a744c390bc7e14e317ce06f3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7a9f3f0e820abe884adeb896b740d477b4368406f32cd30fc6a854adf93cc0435df5441d9df07d16d6ad792dd6671dc3cb61c1f0a744c390bc7e14e317ce06f3"' :
                                        'id="xs-injectables-links-module-AuthModule-7a9f3f0e820abe884adeb896b740d477b4368406f32cd30fc6a854adf93cc0435df5441d9df07d16d6ad792dd6671dc3cb61c1f0a744c390bc7e14e317ce06f3"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BallsModule.html" data-type="entity-link" >BallsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BallsModule-9ba3e52a6398008a26474bdb9ce30f361809a9c29006713a3d8b028755cd2161acfbef6aca909e7678950c96186dc1b138a4e0e8820aa122e441e17c17106648"' : 'data-bs-target="#xs-controllers-links-module-BallsModule-9ba3e52a6398008a26474bdb9ce30f361809a9c29006713a3d8b028755cd2161acfbef6aca909e7678950c96186dc1b138a4e0e8820aa122e441e17c17106648"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BallsModule-9ba3e52a6398008a26474bdb9ce30f361809a9c29006713a3d8b028755cd2161acfbef6aca909e7678950c96186dc1b138a4e0e8820aa122e441e17c17106648"' :
                                            'id="xs-controllers-links-module-BallsModule-9ba3e52a6398008a26474bdb9ce30f361809a9c29006713a3d8b028755cd2161acfbef6aca909e7678950c96186dc1b138a4e0e8820aa122e441e17c17106648"' }>
                                            <li class="link">
                                                <a href="controllers/BallsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BallsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BallsModule-9ba3e52a6398008a26474bdb9ce30f361809a9c29006713a3d8b028755cd2161acfbef6aca909e7678950c96186dc1b138a4e0e8820aa122e441e17c17106648"' : 'data-bs-target="#xs-injectables-links-module-BallsModule-9ba3e52a6398008a26474bdb9ce30f361809a9c29006713a3d8b028755cd2161acfbef6aca909e7678950c96186dc1b138a4e0e8820aa122e441e17c17106648"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BallsModule-9ba3e52a6398008a26474bdb9ce30f361809a9c29006713a3d8b028755cd2161acfbef6aca909e7678950c96186dc1b138a4e0e8820aa122e441e17c17106648"' :
                                        'id="xs-injectables-links-module-BallsModule-9ba3e52a6398008a26474bdb9ce30f361809a9c29006713a3d8b028755cd2161acfbef6aca909e7678950c96186dc1b138a4e0e8820aa122e441e17c17106648"' }>
                                        <li class="link">
                                            <a href="injectables/BallsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BallsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ChatModule-eb897dc35ddced292c96dce2a0e89d5051b0b4229a96c9f6c09e591f55f793698b3a6a8d2e696cc7527a27c6f70f6e96cf070d3d10f1f35c29fe642c08920947"' : 'data-bs-target="#xs-controllers-links-module-ChatModule-eb897dc35ddced292c96dce2a0e89d5051b0b4229a96c9f6c09e591f55f793698b3a6a8d2e696cc7527a27c6f70f6e96cf070d3d10f1f35c29fe642c08920947"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChatModule-eb897dc35ddced292c96dce2a0e89d5051b0b4229a96c9f6c09e591f55f793698b3a6a8d2e696cc7527a27c6f70f6e96cf070d3d10f1f35c29fe642c08920947"' :
                                            'id="xs-controllers-links-module-ChatModule-eb897dc35ddced292c96dce2a0e89d5051b0b4229a96c9f6c09e591f55f793698b3a6a8d2e696cc7527a27c6f70f6e96cf070d3d10f1f35c29fe642c08920947"' }>
                                            <li class="link">
                                                <a href="controllers/ChatController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChatModule-eb897dc35ddced292c96dce2a0e89d5051b0b4229a96c9f6c09e591f55f793698b3a6a8d2e696cc7527a27c6f70f6e96cf070d3d10f1f35c29fe642c08920947"' : 'data-bs-target="#xs-injectables-links-module-ChatModule-eb897dc35ddced292c96dce2a0e89d5051b0b4229a96c9f6c09e591f55f793698b3a6a8d2e696cc7527a27c6f70f6e96cf070d3d10f1f35c29fe642c08920947"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatModule-eb897dc35ddced292c96dce2a0e89d5051b0b4229a96c9f6c09e591f55f793698b3a6a8d2e696cc7527a27c6f70f6e96cf070d3d10f1f35c29fe642c08920947"' :
                                        'id="xs-injectables-links-module-ChatModule-eb897dc35ddced292c96dce2a0e89d5051b0b4229a96c9f6c09e591f55f793698b3a6a8d2e696cc7527a27c6f70f6e96cf070d3d10f1f35c29fe642c08920947"' }>
                                        <li class="link">
                                            <a href="injectables/ChatService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CheckModule.html" data-type="entity-link" >CheckModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CheckModule-87206feed83eff1c64ee56610829cda1a76dad085deae2635f100dbe76a9d4de4020e6364b024efdf2e8c280eb1f6275bc35db74988b91d6fe0364fd4167bab0"' : 'data-bs-target="#xs-controllers-links-module-CheckModule-87206feed83eff1c64ee56610829cda1a76dad085deae2635f100dbe76a9d4de4020e6364b024efdf2e8c280eb1f6275bc35db74988b91d6fe0364fd4167bab0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CheckModule-87206feed83eff1c64ee56610829cda1a76dad085deae2635f100dbe76a9d4de4020e6364b024efdf2e8c280eb1f6275bc35db74988b91d6fe0364fd4167bab0"' :
                                            'id="xs-controllers-links-module-CheckModule-87206feed83eff1c64ee56610829cda1a76dad085deae2635f100dbe76a9d4de4020e6364b024efdf2e8c280eb1f6275bc35db74988b91d6fe0364fd4167bab0"' }>
                                            <li class="link">
                                                <a href="controllers/CheckController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CheckModule-87206feed83eff1c64ee56610829cda1a76dad085deae2635f100dbe76a9d4de4020e6364b024efdf2e8c280eb1f6275bc35db74988b91d6fe0364fd4167bab0"' : 'data-bs-target="#xs-injectables-links-module-CheckModule-87206feed83eff1c64ee56610829cda1a76dad085deae2635f100dbe76a9d4de4020e6364b024efdf2e8c280eb1f6275bc35db74988b91d6fe0364fd4167bab0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CheckModule-87206feed83eff1c64ee56610829cda1a76dad085deae2635f100dbe76a9d4de4020e6364b024efdf2e8c280eb1f6275bc35db74988b91d6fe0364fd4167bab0"' :
                                        'id="xs-injectables-links-module-CheckModule-87206feed83eff1c64ee56610829cda1a76dad085deae2635f100dbe76a9d4de4020e6364b024efdf2e8c280eb1f6275bc35db74988b91d6fe0364fd4167bab0"' }>
                                        <li class="link">
                                            <a href="injectables/CheckService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClickModule.html" data-type="entity-link" >ClickModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ClickModule-6140facd71d10c18b4b311424c115e063f5af91610fb2d1006cb46d747712bf6a255c6abef38b9f56f55ae675911f2208a6a9d602e549654f7940712be524cdc"' : 'data-bs-target="#xs-controllers-links-module-ClickModule-6140facd71d10c18b4b311424c115e063f5af91610fb2d1006cb46d747712bf6a255c6abef38b9f56f55ae675911f2208a6a9d602e549654f7940712be524cdc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ClickModule-6140facd71d10c18b4b311424c115e063f5af91610fb2d1006cb46d747712bf6a255c6abef38b9f56f55ae675911f2208a6a9d602e549654f7940712be524cdc"' :
                                            'id="xs-controllers-links-module-ClickModule-6140facd71d10c18b4b311424c115e063f5af91610fb2d1006cb46d747712bf6a255c6abef38b9f56f55ae675911f2208a6a9d602e549654f7940712be524cdc"' }>
                                            <li class="link">
                                                <a href="controllers/ClickController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClickController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ClickModule-6140facd71d10c18b4b311424c115e063f5af91610fb2d1006cb46d747712bf6a255c6abef38b9f56f55ae675911f2208a6a9d602e549654f7940712be524cdc"' : 'data-bs-target="#xs-injectables-links-module-ClickModule-6140facd71d10c18b4b311424c115e063f5af91610fb2d1006cb46d747712bf6a255c6abef38b9f56f55ae675911f2208a6a9d602e549654f7940712be524cdc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ClickModule-6140facd71d10c18b4b311424c115e063f5af91610fb2d1006cb46d747712bf6a255c6abef38b9f56f55ae675911f2208a6a9d602e549654f7940712be524cdc"' :
                                        'id="xs-injectables-links-module-ClickModule-6140facd71d10c18b4b311424c115e063f5af91610fb2d1006cb46d747712bf6a255c6abef38b9f56f55ae675911f2208a6a9d602e549654f7940712be524cdc"' }>
                                        <li class="link">
                                            <a href="injectables/ClickService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClickService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoursesModule.html" data-type="entity-link" >CoursesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CoursesModule-54bc0bea1897ab19d04076b7d241de81618d692e1bea309523a5c46e986198bea397b24907ee2b99c77c6a47d68ae5417142ef5115cd0fb3b99e88327c46b88c"' : 'data-bs-target="#xs-controllers-links-module-CoursesModule-54bc0bea1897ab19d04076b7d241de81618d692e1bea309523a5c46e986198bea397b24907ee2b99c77c6a47d68ae5417142ef5115cd0fb3b99e88327c46b88c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CoursesModule-54bc0bea1897ab19d04076b7d241de81618d692e1bea309523a5c46e986198bea397b24907ee2b99c77c6a47d68ae5417142ef5115cd0fb3b99e88327c46b88c"' :
                                            'id="xs-controllers-links-module-CoursesModule-54bc0bea1897ab19d04076b7d241de81618d692e1bea309523a5c46e986198bea397b24907ee2b99c77c6a47d68ae5417142ef5115cd0fb3b99e88327c46b88c"' }>
                                            <li class="link">
                                                <a href="controllers/CoursesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/CoursesControllerAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesControllerAdmin</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CoursesModule-54bc0bea1897ab19d04076b7d241de81618d692e1bea309523a5c46e986198bea397b24907ee2b99c77c6a47d68ae5417142ef5115cd0fb3b99e88327c46b88c"' : 'data-bs-target="#xs-injectables-links-module-CoursesModule-54bc0bea1897ab19d04076b7d241de81618d692e1bea309523a5c46e986198bea397b24907ee2b99c77c6a47d68ae5417142ef5115cd0fb3b99e88327c46b88c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoursesModule-54bc0bea1897ab19d04076b7d241de81618d692e1bea309523a5c46e986198bea397b24907ee2b99c77c6a47d68ae5417142ef5115cd0fb3b99e88327c46b88c"' :
                                        'id="xs-injectables-links-module-CoursesModule-54bc0bea1897ab19d04076b7d241de81618d692e1bea309523a5c46e986198bea397b24907ee2b99c77c6a47d68ae5417142ef5115cd0fb3b99e88327c46b88c"' }>
                                        <li class="link">
                                            <a href="injectables/CoursesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FinancesModule.html" data-type="entity-link" >FinancesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FinancesModule-4b25666461058e5391d004bda61678b87fd08140827df4356dd9276558ade6e1e597a6be3abd64d6fc5de1f74a4dd30b046eaef62906ce4d46d07c3d4e403c6d"' : 'data-bs-target="#xs-controllers-links-module-FinancesModule-4b25666461058e5391d004bda61678b87fd08140827df4356dd9276558ade6e1e597a6be3abd64d6fc5de1f74a4dd30b046eaef62906ce4d46d07c3d4e403c6d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FinancesModule-4b25666461058e5391d004bda61678b87fd08140827df4356dd9276558ade6e1e597a6be3abd64d6fc5de1f74a4dd30b046eaef62906ce4d46d07c3d4e403c6d"' :
                                            'id="xs-controllers-links-module-FinancesModule-4b25666461058e5391d004bda61678b87fd08140827df4356dd9276558ade6e1e597a6be3abd64d6fc5de1f74a4dd30b046eaef62906ce4d46d07c3d4e403c6d"' }>
                                            <li class="link">
                                                <a href="controllers/FinancesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FinancesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FinancesModule-4b25666461058e5391d004bda61678b87fd08140827df4356dd9276558ade6e1e597a6be3abd64d6fc5de1f74a4dd30b046eaef62906ce4d46d07c3d4e403c6d"' : 'data-bs-target="#xs-injectables-links-module-FinancesModule-4b25666461058e5391d004bda61678b87fd08140827df4356dd9276558ade6e1e597a6be3abd64d6fc5de1f74a4dd30b046eaef62906ce4d46d07c3d4e403c6d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FinancesModule-4b25666461058e5391d004bda61678b87fd08140827df4356dd9276558ade6e1e597a6be3abd64d6fc5de1f74a4dd30b046eaef62906ce4d46d07c3d4e403c6d"' :
                                        'id="xs-injectables-links-module-FinancesModule-4b25666461058e5391d004bda61678b87fd08140827df4356dd9276558ade6e1e597a6be3abd64d6fc5de1f74a4dd30b046eaef62906ce4d46d07c3d4e403c6d"' }>
                                        <li class="link">
                                            <a href="injectables/FinancesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FinancesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItemModule.html" data-type="entity-link" >ItemModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ItemModule-363d5f1061dfd00f5c0372c7248105a6a862f09bdc0b94bde6b4f18b877d828fb3323f2f7b0f7ae417d9bebf45601a82395ac7c131da5cbcb183f8e0649f6702"' : 'data-bs-target="#xs-controllers-links-module-ItemModule-363d5f1061dfd00f5c0372c7248105a6a862f09bdc0b94bde6b4f18b877d828fb3323f2f7b0f7ae417d9bebf45601a82395ac7c131da5cbcb183f8e0649f6702"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ItemModule-363d5f1061dfd00f5c0372c7248105a6a862f09bdc0b94bde6b4f18b877d828fb3323f2f7b0f7ae417d9bebf45601a82395ac7c131da5cbcb183f8e0649f6702"' :
                                            'id="xs-controllers-links-module-ItemModule-363d5f1061dfd00f5c0372c7248105a6a862f09bdc0b94bde6b4f18b877d828fb3323f2f7b0f7ae417d9bebf45601a82395ac7c131da5cbcb183f8e0649f6702"' }>
                                            <li class="link">
                                                <a href="controllers/ItemController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ItemControllerAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemControllerAdmin</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ItemModule-363d5f1061dfd00f5c0372c7248105a6a862f09bdc0b94bde6b4f18b877d828fb3323f2f7b0f7ae417d9bebf45601a82395ac7c131da5cbcb183f8e0649f6702"' : 'data-bs-target="#xs-injectables-links-module-ItemModule-363d5f1061dfd00f5c0372c7248105a6a862f09bdc0b94bde6b4f18b877d828fb3323f2f7b0f7ae417d9bebf45601a82395ac7c131da5cbcb183f8e0649f6702"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ItemModule-363d5f1061dfd00f5c0372c7248105a6a862f09bdc0b94bde6b4f18b877d828fb3323f2f7b0f7ae417d9bebf45601a82395ac7c131da5cbcb183f8e0649f6702"' :
                                        'id="xs-injectables-links-module-ItemModule-363d5f1061dfd00f5c0372c7248105a6a862f09bdc0b94bde6b4f18b877d828fb3323f2f7b0f7ae417d9bebf45601a82395ac7c131da5cbcb183f8e0649f6702"' }>
                                        <li class="link">
                                            <a href="injectables/ItemService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ItemService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LessonsModule.html" data-type="entity-link" >LessonsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LessonsModule-4860602d3281f3b213df81650129ab00c3bf9b951b3a2dff7163483d1214da6a7146e36d84c2e145cc31c00bd6a87508bfab732ed093580d96be9222de0cf839"' : 'data-bs-target="#xs-controllers-links-module-LessonsModule-4860602d3281f3b213df81650129ab00c3bf9b951b3a2dff7163483d1214da6a7146e36d84c2e145cc31c00bd6a87508bfab732ed093580d96be9222de0cf839"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LessonsModule-4860602d3281f3b213df81650129ab00c3bf9b951b3a2dff7163483d1214da6a7146e36d84c2e145cc31c00bd6a87508bfab732ed093580d96be9222de0cf839"' :
                                            'id="xs-controllers-links-module-LessonsModule-4860602d3281f3b213df81650129ab00c3bf9b951b3a2dff7163483d1214da6a7146e36d84c2e145cc31c00bd6a87508bfab732ed093580d96be9222de0cf839"' }>
                                            <li class="link">
                                                <a href="controllers/LessonsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LessonsModule-4860602d3281f3b213df81650129ab00c3bf9b951b3a2dff7163483d1214da6a7146e36d84c2e145cc31c00bd6a87508bfab732ed093580d96be9222de0cf839"' : 'data-bs-target="#xs-injectables-links-module-LessonsModule-4860602d3281f3b213df81650129ab00c3bf9b951b3a2dff7163483d1214da6a7146e36d84c2e145cc31c00bd6a87508bfab732ed093580d96be9222de0cf839"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LessonsModule-4860602d3281f3b213df81650129ab00c3bf9b951b3a2dff7163483d1214da6a7146e36d84c2e145cc31c00bd6a87508bfab732ed093580d96be9222de0cf839"' :
                                        'id="xs-injectables-links-module-LessonsModule-4860602d3281f3b213df81650129ab00c3bf9b951b3a2dff7163483d1214da6a7146e36d84c2e145cc31c00bd6a87508bfab732ed093580d96be9222de0cf839"' }>
                                        <li class="link">
                                            <a href="injectables/LessonsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LessonsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LibraryModule.html" data-type="entity-link" >LibraryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LibraryModule-d45f480ac3af47bae5d57533e934a47e5752d07ee0b0ca3626509c543ff5ea77d29377a2ef65aca5849e046dc0eb28c3a1601e96dedceb459411515c9103f973"' : 'data-bs-target="#xs-controllers-links-module-LibraryModule-d45f480ac3af47bae5d57533e934a47e5752d07ee0b0ca3626509c543ff5ea77d29377a2ef65aca5849e046dc0eb28c3a1601e96dedceb459411515c9103f973"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LibraryModule-d45f480ac3af47bae5d57533e934a47e5752d07ee0b0ca3626509c543ff5ea77d29377a2ef65aca5849e046dc0eb28c3a1601e96dedceb459411515c9103f973"' :
                                            'id="xs-controllers-links-module-LibraryModule-d45f480ac3af47bae5d57533e934a47e5752d07ee0b0ca3626509c543ff5ea77d29377a2ef65aca5849e046dc0eb28c3a1601e96dedceb459411515c9103f973"' }>
                                            <li class="link">
                                                <a href="controllers/LibraryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LibraryController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/LibraryControllerAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LibraryControllerAdmin</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LibraryModule-d45f480ac3af47bae5d57533e934a47e5752d07ee0b0ca3626509c543ff5ea77d29377a2ef65aca5849e046dc0eb28c3a1601e96dedceb459411515c9103f973"' : 'data-bs-target="#xs-injectables-links-module-LibraryModule-d45f480ac3af47bae5d57533e934a47e5752d07ee0b0ca3626509c543ff5ea77d29377a2ef65aca5849e046dc0eb28c3a1601e96dedceb459411515c9103f973"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LibraryModule-d45f480ac3af47bae5d57533e934a47e5752d07ee0b0ca3626509c543ff5ea77d29377a2ef65aca5849e046dc0eb28c3a1601e96dedceb459411515c9103f973"' :
                                        'id="xs-injectables-links-module-LibraryModule-d45f480ac3af47bae5d57533e934a47e5752d07ee0b0ca3626509c543ff5ea77d29377a2ef65aca5849e046dc0eb28c3a1601e96dedceb459411515c9103f973"' }>
                                        <li class="link">
                                            <a href="injectables/LibraryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LibraryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MentorModule.html" data-type="entity-link" >MentorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MentorModule-bd63a4eabe0a5aa8bf3ac0f20ba3d07363d3585003bf27e003b44d1234bef58898c0a114dc8b17b87330b6033ef63c1ddfd4e8a27610f0c2a6bb62ca7265306e"' : 'data-bs-target="#xs-controllers-links-module-MentorModule-bd63a4eabe0a5aa8bf3ac0f20ba3d07363d3585003bf27e003b44d1234bef58898c0a114dc8b17b87330b6033ef63c1ddfd4e8a27610f0c2a6bb62ca7265306e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MentorModule-bd63a4eabe0a5aa8bf3ac0f20ba3d07363d3585003bf27e003b44d1234bef58898c0a114dc8b17b87330b6033ef63c1ddfd4e8a27610f0c2a6bb62ca7265306e"' :
                                            'id="xs-controllers-links-module-MentorModule-bd63a4eabe0a5aa8bf3ac0f20ba3d07363d3585003bf27e003b44d1234bef58898c0a114dc8b17b87330b6033ef63c1ddfd4e8a27610f0c2a6bb62ca7265306e"' }>
                                            <li class="link">
                                                <a href="controllers/MentorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MentorController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MentorModule-bd63a4eabe0a5aa8bf3ac0f20ba3d07363d3585003bf27e003b44d1234bef58898c0a114dc8b17b87330b6033ef63c1ddfd4e8a27610f0c2a6bb62ca7265306e"' : 'data-bs-target="#xs-injectables-links-module-MentorModule-bd63a4eabe0a5aa8bf3ac0f20ba3d07363d3585003bf27e003b44d1234bef58898c0a114dc8b17b87330b6033ef63c1ddfd4e8a27610f0c2a6bb62ca7265306e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MentorModule-bd63a4eabe0a5aa8bf3ac0f20ba3d07363d3585003bf27e003b44d1234bef58898c0a114dc8b17b87330b6033ef63c1ddfd4e8a27610f0c2a6bb62ca7265306e"' :
                                        'id="xs-injectables-links-module-MentorModule-bd63a4eabe0a5aa8bf3ac0f20ba3d07363d3585003bf27e003b44d1234bef58898c0a114dc8b17b87330b6033ef63c1ddfd4e8a27610f0c2a6bb62ca7265306e"' }>
                                        <li class="link">
                                            <a href="injectables/MentorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MentorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessageModule.html" data-type="entity-link" >MessageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MessageModule-ad0b70503b33ebba28191dbf70a4f86958a62f32c3334280c7e6b6d27474e79c5084f47dfb1c0d175edba676d9fa708f9e421b25b2f7ec037072f606de5d179a"' : 'data-bs-target="#xs-controllers-links-module-MessageModule-ad0b70503b33ebba28191dbf70a4f86958a62f32c3334280c7e6b6d27474e79c5084f47dfb1c0d175edba676d9fa708f9e421b25b2f7ec037072f606de5d179a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MessageModule-ad0b70503b33ebba28191dbf70a4f86958a62f32c3334280c7e6b6d27474e79c5084f47dfb1c0d175edba676d9fa708f9e421b25b2f7ec037072f606de5d179a"' :
                                            'id="xs-controllers-links-module-MessageModule-ad0b70503b33ebba28191dbf70a4f86958a62f32c3334280c7e6b6d27474e79c5084f47dfb1c0d175edba676d9fa708f9e421b25b2f7ec037072f606de5d179a"' }>
                                            <li class="link">
                                                <a href="controllers/MessageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MessageModule-ad0b70503b33ebba28191dbf70a4f86958a62f32c3334280c7e6b6d27474e79c5084f47dfb1c0d175edba676d9fa708f9e421b25b2f7ec037072f606de5d179a"' : 'data-bs-target="#xs-injectables-links-module-MessageModule-ad0b70503b33ebba28191dbf70a4f86958a62f32c3334280c7e6b6d27474e79c5084f47dfb1c0d175edba676d9fa708f9e421b25b2f7ec037072f606de5d179a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessageModule-ad0b70503b33ebba28191dbf70a4f86958a62f32c3334280c7e6b6d27474e79c5084f47dfb1c0d175edba676d9fa708f9e421b25b2f7ec037072f606de5d179a"' :
                                        'id="xs-injectables-links-module-MessageModule-ad0b70503b33ebba28191dbf70a4f86958a62f32c3334280c7e6b6d27474e79c5084f47dfb1c0d175edba676d9fa708f9e421b25b2f7ec037072f606de5d179a"' }>
                                        <li class="link">
                                            <a href="injectables/MessageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModulesModule.html" data-type="entity-link" >ModulesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ModulesModule-ac07efc0a3dcb6324e7597e50cb4b11791bb484afd46e6e0270efe85223f1994c0dbbe5bcee773b88927325b0c9ccc069021a63ac850d0e8cd2d38a1834ae876"' : 'data-bs-target="#xs-controllers-links-module-ModulesModule-ac07efc0a3dcb6324e7597e50cb4b11791bb484afd46e6e0270efe85223f1994c0dbbe5bcee773b88927325b0c9ccc069021a63ac850d0e8cd2d38a1834ae876"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ModulesModule-ac07efc0a3dcb6324e7597e50cb4b11791bb484afd46e6e0270efe85223f1994c0dbbe5bcee773b88927325b0c9ccc069021a63ac850d0e8cd2d38a1834ae876"' :
                                            'id="xs-controllers-links-module-ModulesModule-ac07efc0a3dcb6324e7597e50cb4b11791bb484afd46e6e0270efe85223f1994c0dbbe5bcee773b88927325b0c9ccc069021a63ac850d0e8cd2d38a1834ae876"' }>
                                            <li class="link">
                                                <a href="controllers/ModulesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModulesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ModulesModule-ac07efc0a3dcb6324e7597e50cb4b11791bb484afd46e6e0270efe85223f1994c0dbbe5bcee773b88927325b0c9ccc069021a63ac850d0e8cd2d38a1834ae876"' : 'data-bs-target="#xs-injectables-links-module-ModulesModule-ac07efc0a3dcb6324e7597e50cb4b11791bb484afd46e6e0270efe85223f1994c0dbbe5bcee773b88927325b0c9ccc069021a63ac850d0e8cd2d38a1834ae876"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ModulesModule-ac07efc0a3dcb6324e7597e50cb4b11791bb484afd46e6e0270efe85223f1994c0dbbe5bcee773b88927325b0c9ccc069021a63ac850d0e8cd2d38a1834ae876"' :
                                        'id="xs-injectables-links-module-ModulesModule-ac07efc0a3dcb6324e7597e50cb4b11791bb484afd46e6e0270efe85223f1994c0dbbe5bcee773b88927325b0c9ccc069021a63ac850d0e8cd2d38a1834ae876"' }>
                                        <li class="link">
                                            <a href="injectables/ModulesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModulesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewsModule.html" data-type="entity-link" >NewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NewsModule-6abfd3c84b22a4c078df43e693365978e4a5f09b6c6ff0ab97efbf52a7f9ec328d8a556ba7682cc860b0fa62257505cab85d4a98ce171e1a9c342cc0cdc33d9f"' : 'data-bs-target="#xs-controllers-links-module-NewsModule-6abfd3c84b22a4c078df43e693365978e4a5f09b6c6ff0ab97efbf52a7f9ec328d8a556ba7682cc860b0fa62257505cab85d4a98ce171e1a9c342cc0cdc33d9f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NewsModule-6abfd3c84b22a4c078df43e693365978e4a5f09b6c6ff0ab97efbf52a7f9ec328d8a556ba7682cc860b0fa62257505cab85d4a98ce171e1a9c342cc0cdc33d9f"' :
                                            'id="xs-controllers-links-module-NewsModule-6abfd3c84b22a4c078df43e693365978e4a5f09b6c6ff0ab97efbf52a7f9ec328d8a556ba7682cc860b0fa62257505cab85d4a98ce171e1a9c342cc0cdc33d9f"' }>
                                            <li class="link">
                                                <a href="controllers/NewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/NewsControllerAdmin.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsControllerAdmin</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NewsModule-6abfd3c84b22a4c078df43e693365978e4a5f09b6c6ff0ab97efbf52a7f9ec328d8a556ba7682cc860b0fa62257505cab85d4a98ce171e1a9c342cc0cdc33d9f"' : 'data-bs-target="#xs-injectables-links-module-NewsModule-6abfd3c84b22a4c078df43e693365978e4a5f09b6c6ff0ab97efbf52a7f9ec328d8a556ba7682cc860b0fa62257505cab85d4a98ce171e1a9c342cc0cdc33d9f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NewsModule-6abfd3c84b22a4c078df43e693365978e4a5f09b6c6ff0ab97efbf52a7f9ec328d8a556ba7682cc860b0fa62257505cab85d4a98ce171e1a9c342cc0cdc33d9f"' :
                                        'id="xs-injectables-links-module-NewsModule-6abfd3c84b22a4c078df43e693365978e4a5f09b6c6ff0ab97efbf52a7f9ec328d8a556ba7682cc860b0fa62257505cab85d4a98ce171e1a9c342cc0cdc33d9f"' }>
                                        <li class="link">
                                            <a href="injectables/NewsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotesModule.html" data-type="entity-link" >NotesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NotesModule-62bb05097ffce355a2987842e65d02308ac3ab999f6998c05a5300fa5e5121ce1a1898bcf8bc1a2001efaf1823069ef079185750bf5cdd885bbf0cf9a480007d"' : 'data-bs-target="#xs-controllers-links-module-NotesModule-62bb05097ffce355a2987842e65d02308ac3ab999f6998c05a5300fa5e5121ce1a1898bcf8bc1a2001efaf1823069ef079185750bf5cdd885bbf0cf9a480007d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotesModule-62bb05097ffce355a2987842e65d02308ac3ab999f6998c05a5300fa5e5121ce1a1898bcf8bc1a2001efaf1823069ef079185750bf5cdd885bbf0cf9a480007d"' :
                                            'id="xs-controllers-links-module-NotesModule-62bb05097ffce355a2987842e65d02308ac3ab999f6998c05a5300fa5e5121ce1a1898bcf8bc1a2001efaf1823069ef079185750bf5cdd885bbf0cf9a480007d"' }>
                                            <li class="link">
                                                <a href="controllers/NotesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotesModule-62bb05097ffce355a2987842e65d02308ac3ab999f6998c05a5300fa5e5121ce1a1898bcf8bc1a2001efaf1823069ef079185750bf5cdd885bbf0cf9a480007d"' : 'data-bs-target="#xs-injectables-links-module-NotesModule-62bb05097ffce355a2987842e65d02308ac3ab999f6998c05a5300fa5e5121ce1a1898bcf8bc1a2001efaf1823069ef079185750bf5cdd885bbf0cf9a480007d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotesModule-62bb05097ffce355a2987842e65d02308ac3ab999f6998c05a5300fa5e5121ce1a1898bcf8bc1a2001efaf1823069ef079185750bf5cdd885bbf0cf9a480007d"' :
                                        'id="xs-injectables-links-module-NotesModule-62bb05097ffce355a2987842e65d02308ac3ab999f6998c05a5300fa5e5121ce1a1898bcf8bc1a2001efaf1823069ef079185750bf5cdd885bbf0cf9a480007d"' }>
                                        <li class="link">
                                            <a href="injectables/NotesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymeModule.html" data-type="entity-link" >PaymeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymeModule-b56750d2f43384f09dc892131959b9e14cbfd8a3b5faed3ae433a9038c36488d3fe505ab2d8c8f3a74de2e5d0610cfa6642339d63fbf06bb784a4457e7e513fe"' : 'data-bs-target="#xs-controllers-links-module-PaymeModule-b56750d2f43384f09dc892131959b9e14cbfd8a3b5faed3ae433a9038c36488d3fe505ab2d8c8f3a74de2e5d0610cfa6642339d63fbf06bb784a4457e7e513fe"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymeModule-b56750d2f43384f09dc892131959b9e14cbfd8a3b5faed3ae433a9038c36488d3fe505ab2d8c8f3a74de2e5d0610cfa6642339d63fbf06bb784a4457e7e513fe"' :
                                            'id="xs-controllers-links-module-PaymeModule-b56750d2f43384f09dc892131959b9e14cbfd8a3b5faed3ae433a9038c36488d3fe505ab2d8c8f3a74de2e5d0610cfa6642339d63fbf06bb784a4457e7e513fe"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymeModule-b56750d2f43384f09dc892131959b9e14cbfd8a3b5faed3ae433a9038c36488d3fe505ab2d8c8f3a74de2e5d0610cfa6642339d63fbf06bb784a4457e7e513fe"' : 'data-bs-target="#xs-injectables-links-module-PaymeModule-b56750d2f43384f09dc892131959b9e14cbfd8a3b5faed3ae433a9038c36488d3fe505ab2d8c8f3a74de2e5d0610cfa6642339d63fbf06bb784a4457e7e513fe"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymeModule-b56750d2f43384f09dc892131959b9e14cbfd8a3b5faed3ae433a9038c36488d3fe505ab2d8c8f3a74de2e5d0610cfa6642339d63fbf06bb784a4457e7e513fe"' :
                                        'id="xs-injectables-links-module-PaymeModule-b56750d2f43384f09dc892131959b9e14cbfd8a3b5faed3ae433a9038c36488d3fe505ab2d8c8f3a74de2e5d0610cfa6642339d63fbf06bb784a4457e7e513fe"' }>
                                        <li class="link">
                                            <a href="injectables/PaymeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentsModule.html" data-type="entity-link" >PaymentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentsModule-511e1994519ea230756ff44569d34d32df237bff017a0f79ba1655888915c3f760901b67f9bd2a115c71f7fdcb04bef053c65cbcefaaa23826cbc1878864fbed"' : 'data-bs-target="#xs-controllers-links-module-PaymentsModule-511e1994519ea230756ff44569d34d32df237bff017a0f79ba1655888915c3f760901b67f9bd2a115c71f7fdcb04bef053c65cbcefaaa23826cbc1878864fbed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentsModule-511e1994519ea230756ff44569d34d32df237bff017a0f79ba1655888915c3f760901b67f9bd2a115c71f7fdcb04bef053c65cbcefaaa23826cbc1878864fbed"' :
                                            'id="xs-controllers-links-module-PaymentsModule-511e1994519ea230756ff44569d34d32df237bff017a0f79ba1655888915c3f760901b67f9bd2a115c71f7fdcb04bef053c65cbcefaaa23826cbc1878864fbed"' }>
                                            <li class="link">
                                                <a href="controllers/ClickController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClickController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PaymeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymeController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PaymentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentsModule-511e1994519ea230756ff44569d34d32df237bff017a0f79ba1655888915c3f760901b67f9bd2a115c71f7fdcb04bef053c65cbcefaaa23826cbc1878864fbed"' : 'data-bs-target="#xs-injectables-links-module-PaymentsModule-511e1994519ea230756ff44569d34d32df237bff017a0f79ba1655888915c3f760901b67f9bd2a115c71f7fdcb04bef053c65cbcefaaa23826cbc1878864fbed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentsModule-511e1994519ea230756ff44569d34d32df237bff017a0f79ba1655888915c3f760901b67f9bd2a115c71f7fdcb04bef053c65cbcefaaa23826cbc1878864fbed"' :
                                        'id="xs-injectables-links-module-PaymentsModule-511e1994519ea230756ff44569d34d32df237bff017a0f79ba1655888915c3f760901b67f9bd2a115c71f7fdcb04bef053c65cbcefaaa23826cbc1878864fbed"' }>
                                        <li class="link">
                                            <a href="injectables/ClickService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClickService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaymeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaymentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuestionsModule.html" data-type="entity-link" >QuestionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-QuestionsModule-935f1e72428b8f97d9ba8772c2ab02ad6033e6ea56df140c27c1d50ead119bf2f7b3877bfa6a95632db57cf8dcc3e8b36dc9441403663159f0d8ea19ade848b2"' : 'data-bs-target="#xs-controllers-links-module-QuestionsModule-935f1e72428b8f97d9ba8772c2ab02ad6033e6ea56df140c27c1d50ead119bf2f7b3877bfa6a95632db57cf8dcc3e8b36dc9441403663159f0d8ea19ade848b2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-QuestionsModule-935f1e72428b8f97d9ba8772c2ab02ad6033e6ea56df140c27c1d50ead119bf2f7b3877bfa6a95632db57cf8dcc3e8b36dc9441403663159f0d8ea19ade848b2"' :
                                            'id="xs-controllers-links-module-QuestionsModule-935f1e72428b8f97d9ba8772c2ab02ad6033e6ea56df140c27c1d50ead119bf2f7b3877bfa6a95632db57cf8dcc3e8b36dc9441403663159f0d8ea19ade848b2"' }>
                                            <li class="link">
                                                <a href="controllers/QuestionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-QuestionsModule-935f1e72428b8f97d9ba8772c2ab02ad6033e6ea56df140c27c1d50ead119bf2f7b3877bfa6a95632db57cf8dcc3e8b36dc9441403663159f0d8ea19ade848b2"' : 'data-bs-target="#xs-injectables-links-module-QuestionsModule-935f1e72428b8f97d9ba8772c2ab02ad6033e6ea56df140c27c1d50ead119bf2f7b3877bfa6a95632db57cf8dcc3e8b36dc9441403663159f0d8ea19ade848b2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QuestionsModule-935f1e72428b8f97d9ba8772c2ab02ad6033e6ea56df140c27c1d50ead119bf2f7b3877bfa6a95632db57cf8dcc3e8b36dc9441403663159f0d8ea19ade848b2"' :
                                        'id="xs-injectables-links-module-QuestionsModule-935f1e72428b8f97d9ba8772c2ab02ad6033e6ea56df140c27c1d50ead119bf2f7b3877bfa6a95632db57cf8dcc3e8b36dc9441403663159f0d8ea19ade848b2"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/QuestionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SmsModule.html" data-type="entity-link" >SmsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SmsModule-a0c4a2f5c6d350053ee37579623990f4738b277bbd2ce406b149b8b1ec3b7240e9f451b8f58d8a5592ca8c51cf244f604c77b05df9208cc0bdca99a99006538b"' : 'data-bs-target="#xs-controllers-links-module-SmsModule-a0c4a2f5c6d350053ee37579623990f4738b277bbd2ce406b149b8b1ec3b7240e9f451b8f58d8a5592ca8c51cf244f604c77b05df9208cc0bdca99a99006538b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SmsModule-a0c4a2f5c6d350053ee37579623990f4738b277bbd2ce406b149b8b1ec3b7240e9f451b8f58d8a5592ca8c51cf244f604c77b05df9208cc0bdca99a99006538b"' :
                                            'id="xs-controllers-links-module-SmsModule-a0c4a2f5c6d350053ee37579623990f4738b277bbd2ce406b149b8b1ec3b7240e9f451b8f58d8a5592ca8c51cf244f604c77b05df9208cc0bdca99a99006538b"' }>
                                            <li class="link">
                                                <a href="controllers/SmsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SmsModule-a0c4a2f5c6d350053ee37579623990f4738b277bbd2ce406b149b8b1ec3b7240e9f451b8f58d8a5592ca8c51cf244f604c77b05df9208cc0bdca99a99006538b"' : 'data-bs-target="#xs-injectables-links-module-SmsModule-a0c4a2f5c6d350053ee37579623990f4738b277bbd2ce406b149b8b1ec3b7240e9f451b8f58d8a5592ca8c51cf244f604c77b05df9208cc0bdca99a99006538b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SmsModule-a0c4a2f5c6d350053ee37579623990f4738b277bbd2ce406b149b8b1ec3b7240e9f451b8f58d8a5592ca8c51cf244f604c77b05df9208cc0bdca99a99006538b"' :
                                        'id="xs-injectables-links-module-SmsModule-a0c4a2f5c6d350053ee37579623990f4738b277bbd2ce406b149b8b1ec3b7240e9f451b8f58d8a5592ca8c51cf244f604c77b05df9208cc0bdca99a99006538b"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SmsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SmsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdminController.html" data-type="entity-link" >AdminController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BallsController.html" data-type="entity-link" >BallsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ChatController.html" data-type="entity-link" >ChatController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CheckController.html" data-type="entity-link" >CheckController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ClickController.html" data-type="entity-link" >ClickController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CoursesController.html" data-type="entity-link" >CoursesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CoursesControllerAdmin.html" data-type="entity-link" >CoursesControllerAdmin</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FinancesController.html" data-type="entity-link" >FinancesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ItemController.html" data-type="entity-link" >ItemController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ItemControllerAdmin.html" data-type="entity-link" >ItemControllerAdmin</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LessonsController.html" data-type="entity-link" >LessonsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LibraryController.html" data-type="entity-link" >LibraryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LibraryControllerAdmin.html" data-type="entity-link" >LibraryControllerAdmin</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MentorController.html" data-type="entity-link" >MentorController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MessageController.html" data-type="entity-link" >MessageController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ModulesController.html" data-type="entity-link" >ModulesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NewsController.html" data-type="entity-link" >NewsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NewsControllerAdmin.html" data-type="entity-link" >NewsControllerAdmin</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NotesController.html" data-type="entity-link" >NotesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PaymeController.html" data-type="entity-link" >PaymeController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PaymentsController.html" data-type="entity-link" >PaymentsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/QuestionsController.html" data-type="entity-link" >QuestionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SmsController.html" data-type="entity-link" >SmsController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ball.html" data-type="entity-link" >Ball</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChatGateway.html" data-type="entity-link" >ChatGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckTransactionDto.html" data-type="entity-link" >CheckTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckTransactionStatusDto.html" data-type="entity-link" >CheckTransactionStatusDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfirmTransactionDto.html" data-type="entity-link" >ConfirmTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CoursesServiceAdmin.html" data-type="entity-link" >CoursesServiceAdmin</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminDto.html" data-type="entity-link" >CreateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBallDto.html" data-type="entity-link" >CreateBallDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCourseDto.html" data-type="entity-link" >CreateCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFinanceDto.html" data-type="entity-link" >CreateFinanceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateItemDto.html" data-type="entity-link" >CreateItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLessonDto.html" data-type="entity-link" >CreateLessonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLibraryDto.html" data-type="entity-link" >CreateLibraryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMentorDto.html" data-type="entity-link" >CreateMentorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMessageDto.html" data-type="entity-link" >CreateMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateModuleDto.html" data-type="entity-link" >CreateModuleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNewsDto.html" data-type="entity-link" >CreateNewsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNoteDto.html" data-type="entity-link" >CreateNoteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQuestionDto.html" data-type="entity-link" >CreateQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSmsDto.html" data-type="entity-link" >CreateSmsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTransactionDto.html" data-type="entity-link" >CreateTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Finance.html" data-type="entity-link" >Finance</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItemServiceAdmin.html" data-type="entity-link" >ItemServiceAdmin</a>
                            </li>
                            <li class="link">
                                <a href="classes/LibraryServiceAdmin.html" data-type="entity-link" >LibraryServiceAdmin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/Module.html" data-type="entity-link" >Module</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewsServiceAdmin.html" data-type="entity-link" >NewsServiceAdmin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Note.html" data-type="entity-link" >Note</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestDto.html" data-type="entity-link" >RequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReverseTransactionDto.html" data-type="entity-link" >ReverseTransactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAdminDto.html" data-type="entity-link" >UpdateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBallDto.html" data-type="entity-link" >UpdateBallDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCourseDto.html" data-type="entity-link" >UpdateCourseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFinanceDto.html" data-type="entity-link" >UpdateFinanceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateItemDto.html" data-type="entity-link" >UpdateItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLessonDto.html" data-type="entity-link" >UpdateLessonDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLibraryDto.html" data-type="entity-link" >UpdateLibraryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMentorDto.html" data-type="entity-link" >UpdateMentorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMessageDto.html" data-type="entity-link" >UpdateMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateModuleDto.html" data-type="entity-link" >UpdateModuleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNewsDto.html" data-type="entity-link" >UpdateNewsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNoteDto.html" data-type="entity-link" >UpdateNoteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateQuestionDto.html" data-type="entity-link" >UpdateQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSmDto.html" data-type="entity-link" >UpdateSmDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BallsService.html" data-type="entity-link" >BallsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatService.html" data-type="entity-link" >ChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CheckService.html" data-type="entity-link" >CheckService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClickService.html" data-type="entity-link" >ClickService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CoursesService.html" data-type="entity-link" >CoursesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FinancesService.html" data-type="entity-link" >FinancesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemService.html" data-type="entity-link" >ItemService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LessonsService.html" data-type="entity-link" >LessonsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LibraryService.html" data-type="entity-link" >LibraryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MentorService.html" data-type="entity-link" >MentorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link" >MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModulesService.html" data-type="entity-link" >ModulesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsService.html" data-type="entity-link" >NewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotesService.html" data-type="entity-link" >NotesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentsService.html" data-type="entity-link" >PaymentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymeService.html" data-type="entity-link" >PaymeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QuestionsService.html" data-type="entity-link" >QuestionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SmsService.html" data-type="entity-link" >SmsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/FinanceGuard.html" data-type="entity-link" >FinanceGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/MentorGuard.html" data-type="entity-link" >MentorGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});