import { Building2, Github, Users } from 'lucide-react'
import {
  ProfileCard,
  ProfileContainer,
  ProfileInfo,
  ProfileSummary,
} from './style'

export function Profile() {
  return (
    <ProfileContainer>
      <ProfileCard>
        <img src="http://github.com/nicolascodes18.png" alt="" />
        <ProfileSummary>
          <div>
            <span>Nicolas Gomes</span>
            {/* <a href="#">
              GITHUB
              <ArrowUpRightFromSquare size={11} />
            </a> */}
          </div>

          <p>
            Tristique volutpat pulvinar vel massa, pellentesque egestas. Eu
            viverra massa quam dignissim aenean malesuada suscipit. Nunc,
            volutpat pulvinar vel mass.
          </p>
          <ProfileInfo>
            <div>
              <Github size={18} />
              <span>nicolascodes18</span>
            </div>
            <div>
              <Building2 size={18} />
              <span>Imagem Segurança</span>
            </div>
            <div>
              <Users size={18} />
              <span>100 seguidores</span>
            </div>
          </ProfileInfo>
        </ProfileSummary>
      </ProfileCard>
    </ProfileContainer>
  )
}
