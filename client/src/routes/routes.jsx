import {Routes, Route} from 'react-router-dom'

import Landing from '../pages/landing/landing';
import About from '../pages/about/about';
import Register from '../pages/auth/register';
import Login from '../pages/auth/login';
import Callup from '../pages/landing/callup';
import Dashboard from '../pages/dashboard/dashboard';

import Innovation from '../pages/application/innovation';
import Innovation2 from '../pages/application/innovation2';
import Innovation3 from '../pages/application/innovation3';
import Innovation4 from '../pages/application/innovation4';
import Innovation5 from '../pages/application/innovation5';
import Innovation6 from '../pages/application/innovation6';

import Stem1 from '../pages/application/stem1';
import Stem2 from '../pages/application/stem2';
import Stem3 from '../pages/application/stem3';
import Stem4 from '../pages/application/stem4';
import Stem5 from '../pages/application/stem5';
import Stem6 from '../pages/application/stem6';

import StemTitle from '../pages/application/stemTitle';
import InnovationTitle from '../pages/application/innovation-title';

import Council from './council';
import Redirect from './redirect';

import CouncilLogin from '../council/auth/login';
import CouncilRegister from '../council/auth/register';
import CouncilDashboard from '../council/dashboard/dashboard';
import All from '../council/dashboard/all';
import Pending from '../council/dashboard/pending';
import Graded from '../council/dashboard/graded';
import Gradeapplication from '../council/dashboard/gradeApplication';
import GradeInnovationApplication from '../council/dashboard/gradeInnovationApplication';
import Interview from '../council/dashboard/interview';
import Gallery from '../pages/landing/gallery';

import ApplicationsDash from '../pages/dashboard/applications';

import Admin from '../Admin/admin';
import Bene from './benefi';
import AdminLogin from '../Admin/auth/login';
import AdminInvite from '../Admin/auth/register';

// Admin Pages

import Overview from '../Admin/overview';
import ViewApplicationStem from '../Admin/viewApplication';
import InnovationAdminView from '../Admin/viewApplicationsInnovation';
import Applications from '../Admin/applications';
import Galleryimage from '../pages/landing/galleryImage';
import Councilmemberlisting from '../Admin/councilMemberListing';
import GradeSecSch from '../council/dashboard/gradeSecSch';
import ViewSecSch from '../Admin/viewSecSch';
import Cms from '../Admin/cms';
import LandingCMS from '../Admin/cms/landing';
import CallupsCMS from '../Admin/cms/callups/calllups';
import CallupsCMSList from '../Admin/cms/callups/callupsList';
import CallupEdit from '../Admin/cms/callups/callupEdit';
import BeneficiariesList from '../Admin/cms/beneficiaries/callupsList';
import BeneficiariesCreate from '../Admin/cms/beneficiaries/Create';
import BeneficiariesEdit from '../Admin/cms/beneficiaries/callupEdit';
import Preferences from '../Admin/preferences/preferences';
import Profile from '../Admin/preferences/profile';
import Cohort from '../Admin/preferences/cohort';
import AlbumListing from '../Admin/cms/gallery/callupsList';
import CreateAlbum from '../Admin/cms/gallery/Create';
import EditAlbum from '../Admin/cms/gallery/callupEdit';
import GalleryViews from '../pages/landing/galleryImage';
import Beneficiaries from '../pages/landing/beneficiaries';
import Research from '../pages/application/research';
import ResearchPersonal from '../pages/application/research_personal';
import ResearchProject from '../pages/application/research_project';
import ResearchResults from '../pages/application/research_results';
import ResearchBudget from '../pages/application/research_budget';
import Messaging from '../Admin/messaging/messaging';
import GradeResearch from '../council/dashboard/gradeResearch';
import Awardees from '../Admin/awardees';
import MEForm from '../pages/dashboard/M&EForm';
import MEFormView from '../pages/dashboard/M&EFormView';
import Blog from '../pages/blog/Blog';
import BlogView from '../pages/blog/BlogView';
import Support from '../pages/support/Support';
import Resources from '../pages/resources/resources';
import Contact from '../pages/contact/Contact';
import Portfolio from '../pages/portfolio/Portfolio';
import Verify from '../pages/dashboard/verify';
import { useUser } from '../stores/user.store';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { useEffect } from 'react';

const Router = ({user, cohort}) => {

    const currentUser = useUser(state=>state.currentUser);

    useEffect(() => {
       
    }, [currentUser]);

    return (

        <Routes>

            <Route path = "/"> 


                <Route path = 'register2' element = {<CouncilRegister/>} > </Route>
                <Route path = 'admininvite' element = {<AdminInvite/>} > </Route>
                <Route index element = {<Landing/>} />
                <Route path = 'about' element = {<About/>} />
                <Route path = 'register' element = {<Register/>} />
                <Route path = 'login' element = { <Login/> } />
                <Route path = 'apply' element = {<Callup/>} />
                <Route path = 'blog' element = {<Blog/>} />
                <Route path = 'blog/:id' element = {<BlogView/>} />

                <Route path = "/dashboard" element = {<ProtectedRoute currentUser = {currentUser} allowedTypes={["user"]}/>}>
                    
                    <Route path = '' element = { <Dashboard currentUser = {currentUser} /> }>
                        <Route path = 'verify' element = { <Verify/> } />    
                    </Route>
                    {/* <Route path = 'applications' element = { <ApplicationsDash currentUser = {currentUser} /> }/> */}
                </Route>

                

                <Route path = '/m&e/:uid' element = { <MEForm currentUser = {currentUser} /> } />

                {/* <Route path = '/m&e/:uid' element = {<MEForm />} /> */}

                <Route path = 'portfolio' element = {<Portfolio cohort = {cohort} />} />
                <Route path = 'people' element = {<Council/>} />
                <Route path = 'support/help' element = {<Support/>} />
                <Route path = 'support/resources' element = {<Resources/>} />
                <Route path = 'contact' element = {<Contact/>} />

                <Route path = 'beneficiaries' element = { <Beneficiaries/> } />
                
                {/* <Route path = 'gallery' element = {<Galleryimage />} /> */}
                
                <Route path = 'gallery' element = {<Gallery />} />
                <Route path = 'council' element = {<Redirect navigator = '/council/dashboard/applications/all'/>} />
                <Route path = 'admin' element = {<Redirect navigator = '/admin/overview' />} />
                

                {/* Gallery Applications */}

                <Route path = 'gallery/:albumID' element = { <GalleryViews /> } ></Route>


                {/* Application Routes */}

                <Route path = 'application/:cohort/innovation/:callid' element = { <ProtectedRoute currentUser = {currentUser} allowedTypes={["user"]}/> } >

                    <Route path = '' element = {<InnovationTitle currentUser = {user} />}>
                        <Route path = 'personal' element = {<Innovation currentUser = {user} />} />
                        <Route path = 'vision' element = {<Innovation2 currentUser = {user} />} />
                        <Route path = 'proposition' element = {<Innovation3 currentUser = {user}/>} />
                        <Route path = 'organization' element = {<Innovation4 currentUser = {user} />} />
                        <Route path = 'economics' element = {<Innovation5 currentUser = {user}/>} />
                        <Route path = 'milestones' element = {<Innovation6 currentUser = {user}/>} />
                    </Route>
                    


                </Route>


                <Route path = 'application/:cohort/stem/:callid' element = { Object.keys(currentUser).length && currentUser.type === 'user' ? <StemTitle currentUser = {user} /> : <Login/>  }>

                    <Route path = 'personal' element = {<Stem1 currentUser = {user} />} />
                    <Route path = 'problem' element = {<Stem2 currentUser = {user} />} />
                    <Route path = 'relevance' element = {<Stem3 currentUser = {user}/>} />
                    <Route path = 'impact' element = {<Stem4 currentUser = {user} />} />
                    <Route path = 'scalability' element = {<Stem5 currentUser = {user}/>} />
                    <Route path = 'experience' element = {<Stem6 currentUser = {user}/>} />

                </Route>


                <Route path = 'application/:cohort/research/:callid' element = { Object.keys(currentUser).length && currentUser.type === 'user' ? <Research currentUser = {user} /> : <Login/>  }>

                    <Route path = 'personal' element = {<ResearchPersonal currentUser = {user} />} />
                    <Route path = 'project' element = {<ResearchProject currentUser = {user} />} />
                    <Route path = 'result' element = {<ResearchResults currentUser = {user}/>} />
                    <Route path = 'budget' element = {<ResearchBudget currentUser = {user} />} />

                </Route>


                {/* admin routes */}

                    <Route path = 'admin' element = { Object.keys(currentUser)?.length && currentUser?.type === "admin" ?  <Admin user = {currentUser} /> : <AdminLogin/>  } >

                    {/* Overview Page */}

                    <Route path = 'overview' element = { <Overview /> } />

                    {/* Application Pages */}

                    <Route path = 'applications' element = { <Applications /> } />
                    <Route path = 'applications/stem/:appid/view' element = { <ViewApplicationStem /> } />
                    <Route path = 'applications/innovation/:appid/view' element = { <InnovationAdminView /> } />
                    <Route path = 'applications/secsch/:appid/view' element = { <ViewSecSch /> } />

                    {/* Application Pages */}

                    <Route path = 'awardees' element = { <Awardees /> } />
                    <Route path = 'awardees/form/:uid' element = { <MEFormView /> } />



                    {/* Council Pages */}

                    <Route path = 'council' element = { <Councilmemberlisting /> } />
                    <Route path = 'content' element = { <Cms /> } />

                    {/* Content Pages */}

                    <Route path = 'content/landing' element = { <LandingCMS /> } />

                    <Route path = 'content/callups' element = { <CallupsCMSList /> } />
                    <Route path = 'content/callups/create' element = { <CallupsCMS /> } />
                    <Route path = 'content/callups/edit/:id' element = { <CallupEdit /> } />
                    <Route path = 'content/beneficiaries' element = { <BeneficiariesList /> } />
                    <Route path = 'content/beneficiaries/create' element = { <BeneficiariesCreate /> } />
                    <Route path = 'content/beneficiaries/edit/:cohort/:id' element = { <BeneficiariesEdit /> } />
                    <Route path = 'content/gallery' element = { <AlbumListing /> } />
                    <Route path = 'content/gallery/create' element = { <CreateAlbum /> } />
                    <Route path = 'content/gallery/edit/:id' element = { <EditAlbum /> } />
                    <Route path = 'content/landing' element = { <LandingCMS /> } />

                    {/* Preferences Page */}

                    <Route path = 'preferences' element = {<Preferences />} >

                        <Route path = 'profile' element = { <Profile adminUser = {user} /> } />
                        <Route path = 'cohort' element = { <Cohort /> } />

                    </Route>

                    {/* Messaging Pages */}

                    <Route path = 'messages' element = { <Messaging /> } />
  
                </Route>

                {/* Council Member Routes */}

                <Route path = 'council/dashboard/applications' element = { Object.keys(currentUser).length && currentUser.type === "council" ? <CouncilDashboard user = {currentUser}/> : <CouncilLogin/>  } >

                    <Route path = 'all' element = {<All councilProfile = {currentUser}/>} />
                    
                    <Route path = 'pending' element = {<Pending councilProfile = {currentUser}/>} />

                    <Route path = 'graded' element = {<Graded councilProfile = {currentUser}/>} />

                    <Route path = 'interviewbucket' element = {<Interview councilProfile = {currentUser}/>} />

                    <Route path = 'grade/stem/:appid' element = {< Gradeapplication councilProfile = {currentUser} />} />

                    <Route path = 'grade/innovation/:appid' element = {< GradeInnovationApplication councilProfile = {currentUser} />} />

                    <Route path = 'grade/secsch/:appid' element = {< GradeSecSch councilProfile = {currentUser} />} />

                    <Route path = 'grade/research/:appid' element = {< GradeResearch councilProfile = {currentUser} />} />

                </Route>
                

            </Route>

        </Routes>

    );
}

export default Router;
